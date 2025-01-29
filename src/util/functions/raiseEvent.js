import { isObject, isPrimitive, isSomeArray, isArray } from "locustjs-base";

function preRaise(e, source, dependencies, args, ...rest) {
  let result = -1;

  if (isObject(e) && isObject(source)) {
    if (!isArray(e.sources)) {
      e.sources = [];
    }

    if (e.source !== undefined && e.source !== source) {
      result = e.sources.length;

      const old = {
        source: e.source,
        args: e.args,
      };

      if (e.originalArgs != null) {
        old.originalArgs = e.originalArgs;
      }

      e.sources.push(old);

      e.source = undefined;
    }

    if (e.source === undefined) {
      e.source = source;
    }

    if (isPrimitive(args)) {
      e.args = {
        value: args,
      };
    } else {
      if (args == null) {
        e.args = {};
      } else {
        e.args = args;
      }
    }

    e.dependencies = dependencies;

    if (isSomeArray(rest)) {
      e.originalArgs = rest;
    }
  }

  return result;
}

function postRaise(e, source, prevSourceIndex) {
  if (
    e &&
    isSomeArray(e.sources) &&
    prevSourceIndex >= 0 &&
    prevSourceIndex < e.sources.length
  ) {
    const s = e.sources[prevSourceIndex];
    const current = e.args;

    e.source = s.source;
    e.args = s.args;

    // restoring keys that might have been added to args
    // by upper component

    Object.assign(e.args, current);

    e.originalArgs = s.originalArgs;
    e.sourceIndex = prevSourceIndex + 1;
  }
}

function isHandled(handlerResponse) {
  return handlerResponse === undefined || handlerResponse === true;
}

export { preRaise, postRaise, isHandled };
