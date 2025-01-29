import TranslatorBase from "./TranslatorBase";

class TranslatorNull extends TranslatorBase {
  getLanguage() {}
  setLanguage(lang) {}
  _translateInternal(...args) {
    return args[0];
  }
}

export default TranslatorNull;
