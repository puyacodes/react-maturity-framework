import TranslatorBase from "./TranslatorBase";
import { getProp } from "@utils/base";

/*
  this translator uses javascript objects as its text resources.
  it supports two formats:
  format 1:
  {
    'en': {
      'key1': 'value1',
      'key2': 'value2',
      'key3': 'value3',
      ...
    }
  }

  format 2:
  {
    'key1': {
      'en': 'value1',
      'fa': 'value2',
      'ar': 'value3',
      ...
    },
    'key2': {
      'en': 'value1',
      'fa': 'value2',
      'ar': 'value3',
      ...
    }
  }

  resources are passed as a merged object in TranslatorDefault's ctor.
  objects in both formats can be mixed in the merged resources.

  values could be parametric.
  example:
  
  const resources = {
    en: {
      'register.failed': 'username must have {min}-{max} characters.'
    }
  }

  var translator = new TranslatorDefault(new NullLogger(), { resources });

  console.log(translator.translate("register.failed", { min: 5, max: 20 }));
  // output:
  // username must have 5-20 characters.
*/
class TranslatorDefault extends TranslatorBase {
  constructor(logger, options) {
    super(logger, options);

    this.resources = Object.assign({}, this.options.resources);
    this.language = this.options.language || "en";
  }
  getResources() {
    return this.resources;
  }
  getLanguage() {
    return this.language;
  }
  setLanguage(lang) {
    console.log({'current lang': lang})
    this.language = lang;
  }
  _translateInternal(key, ...args) {
    let result = "";
    const resources = this.getResources();

    for (let item of Object.keys(resources)) {
      const resource = resources[item];
      
      if (resource) {
        if (item == this.language) {
          result = getProp(resource, key);

          if (result) {
            break;
          }
        } else if (item == key) {
          result = resource[this.language];

          if (result) {
            break;
          }
        } else {
          const value = getProp(resources, key);

          if (value !== undefined) {
            result = value;
            break;
          }
        }
      }
    }

    

    return result;
  }
}

export default TranslatorDefault;
