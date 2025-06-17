import TapLogger from "@services/logger";
import { LoggerBase } from "@locustjs/logging";

let _logger;

function configureLogger(appConfig) {
  let result;

  if (_logger) {
    result = _logger;
  } else {
    if (appConfig.logger instanceof LoggerBase) {
      result = _logger = appConfig.logger;
    } else {
      result = _logger = appConfig.logger = new TapLogger();

      result.type = window.localStorage.getItem("logger-type");
    }
  }

  return result;
}

export default configureLogger;
export { _logger as logger };
