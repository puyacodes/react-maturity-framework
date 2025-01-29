import { useImperativeHandle, useRef } from "react";
import { isFunction } from "locustjs-base";
import useEvents from "./useEvents";

const useComponent = (
  props,
  ref,
  members,
  children,
  dependencies = [],
  parent
) => {
  let result = ref;

  result = ref || useRef();
  const [handle, raise, raiseAsync] = useEvents(result)

  useImperativeHandle(
    result,
    () => ({
      getProps: (_) => props,
      getParent: () => isFunction(parent) ? parent(): parent,
      getChildren: (_) => ({
        ...(isFunction(children) ? children(result) : children),
      }),
      handle,
      raise,
      raiseAsync,
      eachChild: function* () {
        const _children =
          (isFunction(children) ? children(result) : children) || {};

        for (let key of Object.keys(_children)) {
          yield _children[key];
        }
      },
      ...(isFunction(members) ? members(result) : members),
    }),
    dependencies
  );

  return result;
};

export default useComponent;
