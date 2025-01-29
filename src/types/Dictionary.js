import { isArray, isNumeric, isObject, isSomeObject } from "locustjs-base";
import safeParse from "../functions/safeParse";

class Dictionary {
  constructor() {
    this._entries = [];
  }
  add(key, value) {
    let index = this.indexOf(key);

    if (index < 0) {
      this._entries.push({ key, value });

      index = this.count - 1;
    } else {
      this._entries[index].value = value;
    }

    return index;
  }
  containsKey(key) {
    return this.indexOf(key) >= 0;
  }
  indexOf(key) {
    const index = this._entries.findIndex((x) => x.key === key);

    return index;
  }
  getValue(...keys) {
    let result = [];

    for (let key of keys) {
      const index = this.indexOf(key);

      if (index >= 0) {
        result.push(this._entries[index].value);
      }
    }

    return keys.length > 1 ? result : keys.length == 1 ? result[0] : undefined;
  }
  remove(key) {
    let result;
    const index = this.indexOf(key);

    if (index >= 0) {
      result = this._entries[index].value;
      this._entries.splice(index, 1);
    }

    return result;
  }
  valueAt(index) {
    let result;

    if (isNumeric(index)) {
      const _index = Number(index);

      if (_index >= 0 && _index < this.count) {
        result = this._entries[_index].value;
      }
    }

    return result;
  }
  itemAt(index) {
    let result;

    if (isNumeric(index)) {
      const _index = Number(index);

      if (_index >= 0 && _index < this.count) {
        result = this._entries[_index];
      }
    }

    return result;
  }
  removeAt(index) {
    let result;

    if (isNumeric(index)) {
      const _index = Number(index);

      if (_index >= 0 && _index < this.count) {
        result = this._entries[_index].value;

        this.splice(_index, 1);
      }
    }

    return result;
  }
  clear() {
    this._entries = [];
  }
  toArray() {
    return this._entries.map((x) => ({ key: x.key, value: x.value }));
  }
  getKeys() {
    return this._entries.map((x) => x.key);
  }
  getValues() {
    return this._entries.map((x) => x.value);
  }
  get count() {
    return this._entries.length;
  }
  *[Symbol.iterator]() {
    for (let item of this._entries) {
      yield item;
    }
  }
  toJson() {
    return JSON.stringify(this._entries);
  }
  fromJson(json) {
    this.clear();

    const items = safeParse(json, []);

    if (isArray(items)) {
      for (let item of items) {
        if (isSomeObject(item)) {
          this.add(item.key, item.value);
        }
      }
    }
  }
}

export default Dictionary;
