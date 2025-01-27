import configureLogger, { logger } from "./configure.logger";
import configureLocator, { getLocator, getDependencyImplementation } from "./configure.locator";
import configurei18n from "./configure.i18n";
import confgiureAppConfig from "./configure.appConfig";
import configureResources from "./configure.resources";
import configureExtensions from "@utils/extensions";

async function configure(store, appConfig) {
  configureExtensions();
  
  const logger = configureLogger(appConfig);
  const _appConfig = confgiureAppConfig(appConfig, logger, store);
  const { i18next, resources } = await configurei18n({ store, logger, appConfig: _appConfig });
  const locator = configureLocator({ store, logger, i18next, resources, appConfig: _appConfig });

  return { locator, logger, appConfig: _appConfig };
}

export default configure;
export {
  logger,
  getLocator,
  configureLogger,
  configureLocator,
  configurei18n,
  confgiureAppConfig,
  configureResources,
  getDependencyImplementation
};
