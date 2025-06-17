import {
  throwIfInstantiateAbstract,
  throwIfNotInstanceOf,
  throwNotImplementedException,
} from "@locustjs/exception";
import { isEmpty } from "@locustjs/base";
import { LoggerBase } from "@locustjs/logging";
import { format } from "@locustjs/extensions-string";

class TranslatorBase {
  constructor(logger, options) {
    throwIfInstantiateAbstract(TranslatorBase, this);
    throwIfNotInstanceOf("logger", LoggerBase, logger);

    this.logger = logger;
    this.options = Object.assign({}, options);
    this.t = this.t.bind(this);
    this.td = this.td.bind(this);
  }
  _translateInternal(...args) {
    throwNotImplementedException("TranslatorServiceBase.translateInternal");
  }
  getLanguage() {
    throwNotImplementedException("TranslatorServiceBase.getLanguage");
  }
  setLanguage(lang) {
    throwNotImplementedException("TranslatorServiceBase.setLanguage");
  }
  translate(key, ...args) {
    let result = "";

    if (key) {
      result = this._translateInternal(key, ...args);

      if (result && result.startsWith("{") && result.endsWith("}")) {
        result = this._translateInternal(
          result.substring(1, result.length - 1),
          ...args
        );
      }

      if (isEmpty(result)) {
        result = key;
      }
    }

    if (result && args.length) {
      result = format(result, ...args);
    }

    return result;
  }
  t(...args) {
    return this.translate(...args);
  }
  td(key, defaultText, ...args) {
    let result = this.translate(key, ...args);

    if (!result || result == key) {
      result = defaultText;
    }

    return result;
  }
}

TranslatorBase.dependencies = [LoggerBase];

export default TranslatorBase;
