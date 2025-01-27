import i18nStart from "@utils/i18n";
import configureResources from "./configure.resources";

async function configurei18n({ store, logger, appConfig, debug = false }) {
  logger.enterScope(configurei18n);
  logger.debug("configuring i18n ...");

  const resources = configureResources(appConfig, logger);
  const currentLang = store.getState().lang;
  const i18next = await i18nStart({
    lng: currentLang.code,
    supportedLngs: appConfig.supportedLangs,
    debug,
    logger,
    resources,
  });

  logger.debug(`current language is: ${i18next.language}`);
  logger.debug("i18n configured");

  logger.exitScope();

  return { i18next, resources };
}

export default configurei18n;
