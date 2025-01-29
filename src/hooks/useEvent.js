import { isArray, isFunction, isSomeString, isString } from "locustjs-base";
import { useCallback, useEffect, useState } from "react";

function useEvent(
  event,
  selector,
  handler,
  active = true,
  capture = false,
  dependencies = [],
) {
  const [added, setAdded] = useState(false);
  const _callback = useCallback((event) => {
    if (active && isFunction(handler)) {
      handler(event);
    }
  }, [event, selector, handler, active, capture, ...dependencies]);

  useEffect(() => {
    const nodes = selector == null ? [document] : isString(selector) ? document.querySelectorAll(selector) :
      isArray(selector) ? selector : [];

    if (added) {
      console.log(`REMOVE: removing existing ${nodes.length} ${event} handler(s) ...`)

      for (let node of nodes) {
        node.removeEventListener(event, _callback, capture);
      }
    }

    if (active && isSomeString(event)) {
      console.log(`ADD: adding ${event} event handler for ${nodes.length} element(s)`)
      
      for (let node of nodes) {
        node.addEventListener(event, _callback, capture);
      }

      setAdded(true);
    } else {
      console.log(`NONE: not active or no event (#elements = ${nodes.length})`)

      setAdded(false);
    }

    return () => {
      console.log(`CLEANUP: clearing ${nodes.length} ${event} handler(s) ...`)

      for (let node of nodes) {
        node.removeEventListener(event, _callback, capture);
      }
    };
  }, [event, selector, handler, active, capture, ...dependencies]);
}

export default useEvent;
