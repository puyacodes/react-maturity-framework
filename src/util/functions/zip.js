import {
  isArray,
  isEmpty,
  isFunction,
  isPrimitive,
  isString,
  isDate,
  isNumeric,
  isIterable,
} from "locustjs-base";

function zip(obj, ignoreEmpties = false) {
  let result = "";

  if (obj === null) {
    result = "null";
  } else if (obj === undefined) {
    result = "";
  } else if (isString(obj)) {
    if (isNumeric(obj)) {
      result = JSON.stringify(+obj);
    } else {
      result = JSON.stringify(obj);
    }
  } else if (isDate(obj)) {
    result = obj.getTime().toString();
  } else if (isPrimitive(obj) || obj instanceof RegExp || typeof obj == "symbol" || typeof obj == "bigint") {
    result = obj.toString();
  } else if (isArray(obj)) {
    result = "[" + obj.map((x) => zip(x)) + "]";
  } else if (isIterable(obj)) {
    const values = []

    for (let value of obj) {
      values.push(zip(value))
    }

    result = '[' + values.join(',') + ']';
  } else if (isFunction(obj)) {
    result = "";
  } else {  // obj is an object
    result = [];

    for (let key of Object.keys(obj).sort()) {
      if (!isEmpty(obj[key]) || !ignoreEmpties) {
        result.push(`${key}=${zip(obj[key])}`);
      }
    }

    result = "{" + result.join(",") + "}";
  }

  return result;
}

export default zip;
