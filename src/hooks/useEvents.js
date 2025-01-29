import { preRaise, postRaise, isHandled } from "../functions/raiseEvent";
import useDependencies from "./useDependencies";
import { isFunction, isObject } from "locustjs-base";

const useEvents = (source) => {
  const dependencies = useDependencies();
  const handle =
    (handler, args) =>
    (e, ...rest) => {
      let result;

      if (!isObject(e)) {
        e = {};
      }

      const prevSourceIndex = preRaise(
        e,
        source.current,
        dependencies,
        args,
        ...rest
      );

      if (isFunction(handler)) {
        result = handler(e);

        postRaise(e, source, prevSourceIndex);
      }

      return result;
    };

  const raise = (handler, e, args) => {
    let ok;

    if (!isObject(e)) {
      e = {};
    }

    if (isFunction(handler)) {
      const prevSourceIndex = preRaise(e, source.current, dependencies, args);

      ok = handler(e);

      postRaise(e, source, prevSourceIndex);
    }

    return isHandled(ok);
  };
  const raiseAsync = (handler, e, args) => {
    let ok;
    let prevSourceIndex;

    if (!isObject(e)) {
      e = {};
    }

    if (isFunction(handler)) {
      prevSourceIndex = preRaise(e, source.current, dependencies, args);

      ok = handler(e);
    }

    if (ok && isFunction(ok.then)) {
      return new Promise((res) =>
        ok.then((_ok) => {
          postRaise(e, source, prevSourceIndex);

          res(isHandled(_ok));
        })
      );
    } else {
      return new Promise((res) => {
        postRaise(e, source, prevSourceIndex);

        res(isHandled(ok));
      });
    }
  };

  return [handle, raise, raiseAsync];
};

export default useEvents;
