import { isObject, isNull, isString, isArray, isFunction } from "locustjs-base";

function clean(obj, fnClean) {
  let _obj = {
    ...obj,
  };

  for (let propName of Object.keys(_obj)) {
    const value = _obj[propName];

    if (isObject(value)) {
      if (!isArray(value)) {
        _obj[propName] = clean(value);
      }
    } else if (
      isNull(value) ||
      (typeof value == "number" && isNaN(value)) ||
      (isString(value) && value == "")
    ) {
      delete _obj[propName];
    }
  }

  if (isFunction(fnClean)) {
    _obj = fnClean(_obj, obj);
  }

  return _obj;
}

export default clean;
