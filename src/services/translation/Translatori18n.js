import TranslatorBase from "./TranslatorBase";
import { throwIfEmpty } from "locustjs-exception";
import { isFunction } from "locustjs-base";

class Translatori18n extends TranslatorBase {
  constructor(logger, options) {
    super(logger, options);

    throwIfEmpty(this.options.i18next, "i18next");
  }
  getLanguage() {
    return this.options.i18next.language;
  }
  setLanguage(lang) {
    this.options.i18next.changeLanguage(lang);
  }
  _translateInternal(...args) {
    this.logger.enterScope("Translatori18n._translateInternal");

    if (this.options.i18next) {
      if (isFunction(this.options.i18next.t)) {
        this.logger.exitScope();
        
        return this.options.i18next.t(...args);
      } else {
        this.logger.warn("this.options.i18next.t is not a function");
      }
    } else {
      this.logger.warn("this.options.i18next is empty");
    }

    this.logger.exitScope();
  }
}

export default Translatori18n;
