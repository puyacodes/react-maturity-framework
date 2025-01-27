import resources from "@utils/locales";
import merge from "lodash/merge";
import { isSomeArray } from "locustjs-base";

function configureResources(appConfig, logger) {
  logger.enterScope(configureResources);
  logger.debug("configure resources ...");

  const loginCustomizedTexts = {};
  const appCustomizedTexts = {};

  if (appConfig.login?.texts) {
    for (let lang of Object.keys(appConfig.login?.texts)) {
      loginCustomizedTexts[lang] = {
        translation: { login: appConfig.login?.texts[lang] },
      };
    }
  }

  if (appConfig.texts) {
    for (let lang of Object.keys(appConfig.texts)) {
      appCustomizedTexts[lang] = {
        translation: { app: appConfig.texts[lang] },
      };
    }
  }

  let subSystemResources = {};

  if (isSomeArray(appConfig.subSystems)) {
    for (let subSystem of appConfig.subSystems) {
      subSystemResources = merge(subSystemResources, subSystem.locales);
    }
  }
  
  const result = merge(
    resources,
    subSystemResources,
    appConfig.locales,
    loginCustomizedTexts,
    appCustomizedTexts
  );
  
  logger.exitScope();

  return result;
}

export default configureResources;
