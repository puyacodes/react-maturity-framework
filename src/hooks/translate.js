import useTranslator from "./useTranslator";
import {
  isArray,
  isSomeObject,
  isSomeString,
  isSomeArray,
} from "@locustjs/base";
import merge from "lodash/merge";
import { objectify } from "@utils/base";

function translate(obj, prefix = '') {
  const { t } = useTranslator();
  let result = {};
  let key = "",
    args = [];

  if (isArray(obj)) {
    for (let item of obj) {
      if (isSomeString(item)) {
        key = item;
      } else if (isSomeArray(item)) {
        key = item[0];
        args = item.slice(1);
      } else if (isSomeObject(item)) {
        key = Object.keys(item)[0];
        args = item[key];

        if (!isArray(args)) {
          args = [args];
        }
      } else {
        key = "";
      }

      if (isSomeString(key)) {
        const _key = key.startsWith(".") ? prefix + key : key;
        const prop = key.startsWith(".") ? key.substr(1) : key;

        if (prop) {
          const tran = objectify(prop, t(_key, ...args));

          result = merge(result, tran);
        }
      }
    }
  } else if (isSomeObject(obj)) {
    for (key of Object.keys(obj)) {
      if (isSomeString(key)) {
        const _key = key.startsWith(".") ? prefix + key : key;
        const prop = key.startsWith(".") ? key.substr(1) : key;

        args = obj[key];

        if (!isArray(args)) {
          args = [args];
        }

        result = merge(result, objectify(prop, t(_key, ...args)));
      }
    }
  }

  return result;
}

export default translate;
