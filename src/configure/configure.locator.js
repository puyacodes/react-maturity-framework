import { isArray, isObject } from "locustjs-base";
import { AjaxBase, AjaxUsingFetch } from "@services/ajax";
import { ApiClientBase, ApiClientRemote } from "@services/apiclient";
import { DefaultLocator, LocatorBase } from "locustjs-locator";
import { LoggerBase } from "locustjs-logging";
import { CacheBase, CacheDefault } from "locustjs-cache";
import {
  TranslatorBase,
  Translatori18n,
} from "@services/translator";
import {
  AppConfig,
  VisitService,
} from "@business-services/base";
import { AppServiceBase, AppServiceRemote } from "@business-services/app";
import Framework from "../Framework";
import TapDebugger from "@utils/debugger";
import { ApiCryptorBase, ApiAesCryptor } from "@services/api-encryption";
import { IdentityServiceBase, IdentityServiceLocalStorage, IdentityServiceSessionStorage } from '@business-services/base';
import { isFunction } from "lodash";

let _locator;

function getClassName(fn) {
  return fn && fn.prototype && fn.prototype.constructor
    ? fn.prototype.constructor.name
    : "";
}

function configureDependencies(locator, logger, dependencies, env) {
  logger.enterScope("configureLocator > configureDependencies");

  if (isArray(dependencies)) {
    for (let item of dependencies) {
      if (isArray(item)) {
        const [abstraction, concretionRemote, concretionFake, options] = item;

        logger.debug(
          `registering ${getClassName(abstraction)}:
           Remote = ${getClassName(concretionRemote)},
           Fake=${getClassName(concretionFake)}, options=${options}`
        );

        locator.safeRegister(abstraction, concretionRemote, concretionFake, {
          ...options,
          env: env,
        });
      }
    }
  }

  logger.exitScope();
}

function configureSubSystems(locator, logger, appConfig) {
  logger.enterScope("configureLocator > configureSubSystems");

  if (isArray(appConfig.subSystems)) {
    for (let subSystem of appConfig.subSystems) {
      configureDependencies(
        locator,
        logger,
        subSystem.dependencies,
        appConfig.env
      );
    }
  } else {
    logger.warn("subSystems is not array", appConfig.subSystems);
  }

  logger.exitScope();
}

function getDependencyImplementation(key, overrides, defaultImplementation) {
  let result = defaultImplementation;

  if (key && overrides && overrides[key] != null) {
    result = overrides[key];
  }
  
  return result;
}

function configureLocator({
  store,
  logger,
  i18next,
  resources,
  appConfig,
  force = false,
}) {
  let result;

  logger.enterScope(configureLocator);

  if (!_locator || force) {
    const overrides = isObject(appConfig.overridedDependencies) ? appConfig.overridedDependencies
      : isFunction(appConfig.overridedDependencies) ? appConfig.overridedDependencies(appConfig)
        : null;

    const currentLang = store.getState().lang;

    logger.debug("configuring locator ...");

    result = getDependencyImplementation(
      "locator",
      overrides,
      new DefaultLocator({ logger })
    );

    result.safeRegister(
      AppConfig,
      getDependencyImplementation(
        "appConfig",
        overrides,
        new AppConfig(appConfig)
      )
    );
    result.safeRegister(LocatorBase, result);

    result.safeRegister(
      VisitService,
      getDependencyImplementation("visit", overrides, new VisitService())
    );
    result.safeRegister(
      ApiCryptorBase,
      getDependencyImplementation("apiCryptor", overrides, new ApiAesCryptor(appConfig.crypt))
    );
    result.safeRegister(
      TapDebugger,
      getDependencyImplementation("debugger", overrides, TapDebugger)
    );
    result.safeRegister(
      LoggerBase,
      getDependencyImplementation("logger", overrides, logger)
    );
    result.safeRegister(
      CacheBase,
      getDependencyImplementation("cache", overrides, new CacheDefault())
    );
    result.safeRegister(
      TranslatorBase,
      getDependencyImplementation(
        "translator",
        overrides,
        new Translatori18n(logger, {
          i18next,
          resources,
          language: currentLang.code,
        })
      )
    );
    result.safeRegister(Framework, Framework);
    result.safeRegister(
      AjaxBase,
      getDependencyImplementation("ajax", overrides, new AjaxUsingFetch())
    );
    result.safeRegister(
      ApiClientBase,
      getDependencyImplementation("apiClient", overrides, ApiClientRemote)
    );
    result.safeRegister(
      AppServiceBase,
      getDependencyImplementation("app", overrides, AppServiceRemote)
    );

    let identityService;

    if (overrides) {
      identityService = overrides.identity
    }
    
    if (!identityService) {
      if (appConfig.identity == 'localStorage') {
        identityService = new IdentityServiceLocalStorage(appConfig)
      } else if (appConfig.identity == 'sessionStorage') {
        identityService = new IdentityServiceSessionStorage(appConfig, logger)
      } else {
        logger.warn("unknown identity: " + appConfig.identity);
      }
    }

    if (!isFunction(identityService) && !isObject(identityService)) {
      logger.warn("no identity specified. falling back to localStorage identity.");

      identityService = new IdentityServiceLocalStorage(appConfig)
    }

    logger.debug("Identity service", identityService);

    result.safeRegister(IdentityServiceBase, identityService);
    // result.safeRegister(
    //   IdentityServiceBase,
    //   getDependencyImplementation("identity", overrides, identityService || new IdentityServiceLocalStorage(appConfig))
    // );

    configureSubSystems(result, logger, appConfig);
    configureDependencies(
      result,
      logger,
      appConfig.dependencies,
      appConfig.env
    );

    logger.debug("locator configured");

    _locator = result;
  } else {
    result = _locator;
  }

  logger.exitScope();

  return result;
}

function getLocator() {
  return _locator;
}

export default configureLocator;
export { getLocator, getDependencyImplementation };
