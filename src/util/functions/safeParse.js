import parse from "loose-json";
import { isFunction, isSomeString } from "@locustjs/base";

function safeParse(json, _default, loose = true, onError = null) {
  let result = _default;

  if (isSomeString(json)) {
    try {
      result = loose ? parse(json) : JSON.parse(json);

      if (result == null) {
        result = _default;
      }
    } catch (e) {
      let r;

      if (isFunction(onError)) {
        r = onError({ e, data: json, init: _default, loose })
      }

      if (r == null) {
        result = _default;
      } else {
        result = r;
      }
    }
  } else {
    result = json;
  }

  return result;
}

if (JSON.safeParse === undefined) {
  JSON.safeParse = safeParse;
}

export default safeParse;
