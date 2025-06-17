import { isIterable, isSomeString } from "@locustjs/base";
import getHash from './getHash';

function distinct(list, keyProp) {
  const result = [];
  const map = new Map();

  if (isIterable(list)) {
    for (const item of list) {
      let key;

      if (isSomeString(keyProp)) {
        if (item) {
          key = item[keyProp]
        }
      }

      if (!key) {
        key = getHash(item);
      }


      if (!map.has(key)) {
        map.set(key, true); // set any value to Map

        result.push(item);
      }
    }
  }
}

export default distinct;
