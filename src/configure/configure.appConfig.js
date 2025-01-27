import { initAppConfig } from "@config/base";
import parse from "loose-json";

function confgiureAppConfig(appConfig, logger, store) {
  let _appConfig = {};

  try {
    const request = new XMLHttpRequest();

    request.open("GET", "/js/app-config.json?" + Number(new Date()), false);

    request.send(null);

    if (request.status === 200) {
      _appConfig = parse(request.response);
    }
  } catch (e) {
    logger.danger(e);
  }

  const lang = store.getState().lang.code;
  const result = initAppConfig({ ..._appConfig, ...appConfig, lang });

  if (result.defaultSubSystem == null) {
    result.defaultSubSystem =
      result.subSystems && result.subSystems.length
        ? result.subSystems[0].config.info.basePath
        : undefined;
  }

  return result;
}

export default confgiureAppConfig;
