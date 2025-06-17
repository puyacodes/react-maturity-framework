import { isEmpty, isFunction, isSomeString } from "@locustjs/base";
import DebuggerBase from "./DebuggerBase";
import { InMemoryStorage } from '@locustjs/storage';

const _storage = new InMemoryStorage()
class DebuggerDefault extends DebuggerBase {
  constructor(options) {
    super();

    this.options = Object.assign({
      debugModeKey: '',
      logFilterKey: '',
      logScopeFilterKey: '',
      storage: null
    }, options)

    if (!isSomeString(this.options.debugModeKey)) {
      this.options.debugModeKey = '_dbg.dm'
    }
    if (!isSomeString(this.options.logFilterKey)) {
      this.options.debugModeKey = '_dbg.lf'
    }
    if (!isSomeString(this.options.logScopeFilterKey)) {
      this.options.debugModeKey = '_dbg.lsf'
    }
  }
  get storage() {
    let result = this.options.storage;

    if (isEmpty(this.options.storage || !isFunction(this.options.storage.getItem) || !isFunction(this.options.storage.setItem))) {
      if (typeof window == 'undefined') {
        result = _storage
      } else {
        result = window.sessionStorage;
      }
    }
    
    return result;
  }
  get debugMode() {
    const value = this.storage.getItem(this.options.debugModeKey);

    return value == "true" || value == "1";
  }
  set debugMode(value) {
    this.storage.setItem(this.options.debugModeKey, value);
  }
  get logFilter() {
    const value = this.storage.getItem(this.options.logFilterKey);

    return value;
  }
  set logFilter(value) {
    this.storage.setItem(this.options.logFilterKey, value);
  }
  get logScopeFilter() {
    const value = this.storage.getItem(this.options.logScopeFilterKey);

    return value;
  }
  set logScopeFilter(value) {
    this.storage.setItem(this.options.logScopeFilterKey, value);
  }
}

export default DebuggerDefault;
