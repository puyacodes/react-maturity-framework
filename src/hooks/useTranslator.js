import useLocator from "./useLocator";
import { TranslatorBase, TranslatorNull } from "@services/translator";
import { LoggerBase, NullLogger } from "locustjs-logging";

const useTranslator = (options = {}) => {
  const locator = useLocator();
  let result = locator && locator.resolve(TranslatorBase);
  let logger = locator && locator.resolve(LoggerBase);

  if (!logger) {
    logger = options && options.logger;

    if (!(logger || logger instanceof LoggerBase)) {
      logger = new NullLogger();
    }
  }

  if (!result) {
    result = options && options.default;

    if (!(result || result instanceof TranslatorBase)) {
      result = new TranslatorNull(logger);
    }
  }

  return result;
};

export default useTranslator;
