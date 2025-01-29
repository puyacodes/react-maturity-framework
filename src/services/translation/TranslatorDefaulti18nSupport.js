import TranslatorDefault from "./TranslatorDefault";

class TranslatorDefaulti18nSupport extends TranslatorDefault {
  constructor(...args) {
    super(...args);

    this._resources = null;
  }
  getResources() {
    let result = this._resources;

    if (!result) {
      result = {};

      for (let lang of Object.keys(this.resources)) {
        result[lang] = this.resources[lang].translation;
      }

      this._resources = result;
    }

    return result;
  }
}

export default TranslatorDefaulti18nSupport;
