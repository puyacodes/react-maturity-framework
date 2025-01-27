import { isArray, isFunction, isObject } from "locustjs-base";
import { useRef, useState } from "react";

// prev name: useFreeState
const _useState = (initialState, afterSetState) => {
  const [state, setState] = useState(initialState);
  const ref = useRef();

  return [
    () => ref.current === undefined ? state : ref.current,
    (newState) => {
      let _newState;

      if (isFunction(newState)) {
        _newState = newState(ref.current);
      } else {
        _newState = newState;
      }

      if (isObject(_newState)) {
        if (isArray(_newState)) {
          _newState = [...ref.current, ..._newState];
        } else {
          _newState = { ...ref.current, ..._newState };
        }
      }

      ref.current = _newState;

      setState(_newState)

      if (isFunction(afterSetState)) {
        afterSetState(ref.current);
      }
    },
  ];
};

export default _useState;
