import useDebugger from "./useDebugger";
import useLocator from "./useLocator";
import useLogger from "./useLogger";
import useTranslator from "./useTranslator";
import { useLocation, useNavigate } from "react-router-dom";

function useDependencies() {
  const locator = useLocator();
  const logger = useLogger();
  const translator = useTranslator();
  const _debugger = useDebugger();

  try {
    const location = useLocation();
    const navigate = useNavigate();

    return {
      locator,
      logger,
      translator,
      debugger: _debugger,
      location,
      navigate,
    };
  } catch (error) {
    return {
      locator,
      logger,
      translator,
      debugger: _debugger,
    };
  }
}

export default useDependencies;
