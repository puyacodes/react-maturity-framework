import React, { useContext } from "react";
import useLocator from "../../hooks/useLocator";
import useLogger from "../../hooks/useLogger";
import useTranslator from "../../hooks/useTranslator";
import { isSomeObject, isSomeString } from "@locustjs/base";
import useDebugger from "../../hooks/useDebugger";

const withContexts = (Component, contexts) =>
  React.forwardRef((props, ref) => {
    const locator = useLocator();
    const logger = useLogger();
    const translator = useTranslator();
    const _debugger = useDebugger();

    const restContexts = {};

    if (isSomeObject(contexts)) {
      for (let key of Object.keys(contexts)) {
        if (isSomeString(key)) {
          restContexts[key] = useContext(contexts[key]);
        }
      }
    }

    return (
      <Component
        locator={locator}
        logger={logger}
        debugger={_debugger}
        translator={translator}
        ref={ref}
        {...restContexts}
        {...props}
      />
    );
  });

export default withContexts;
