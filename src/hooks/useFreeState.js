import { isArray, isFunction, isObject } from "locustjs-base";
import { useRef } from "react";

const useFreeState = (initialState, setState) => {
  const ref = useRef();

  ref.current = initialState;

  return [
    () => ref.current,
    (newState) => {
      let _newState;

      if (isFunction(newState)) {
        _newState = newState(ref.current);
      } else {
        _newState = newState;
      }

      if (isObject(_newState) && !isArray(_newState)) {
        _newState = { ...ref.current, ..._newState };
      }

      ref.current = _newState;

      if (isFunction(setState)) {
        setState(ref.current);
      }
    },
  ];
};

export default useFreeState;
