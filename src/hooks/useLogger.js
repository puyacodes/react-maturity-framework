import useLocator from "./useLocator";
import { LoggerBase, NullLogger } from "locustjs-logging";

const useLogger = (defaultLogger) => {
  const locator = useLocator();
  let result = locator && locator.resolve(LoggerBase);

  if (!result) {
    result = defaultLogger || (new NullLogger());
  }

  return result;
};

export default useLogger;
