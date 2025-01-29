import { BaseEnum } from "locustjs-enum";
import { TranslatorBase } from "@services/translator";
import { Dictionary } from "@utils/base";

const _cache = new Dictionary();

function cacheEnum(translator, enumObject) {
  const result = [];

  for (let name of enumObject.getNames()) {
    result.push({
      text: translator.td(`enums.${enumObject.name}.${name}`, `${name}`),
      value: `${enumObject[name]}`,
    });
  }

  _cache.add(enumObject, result);
}

function _getItems() {
  if (TranslatorBase.prototype.getItems == null) {
    TranslatorBase.prototype.getItems = function (enumObject) {
      let result = [];

      if (enumObject instanceof BaseEnum) {
        result = _cache.getValue(enumObject);

        if (result == null) {
          result = cacheEnum(this, enumObject);
        }
      }

      return result;
    };
  }
}

function _getText() {
  if (TranslatorBase.prototype.getText == null) {
    TranslatorBase.prototype.getText = function (enumObject, value) {
      let result = "";

      if (enumObject instanceof BaseEnum) {
        const name = enumObject.getString(value);

        result = this.td(`enums.${enumObject.name}.${name}`, `${name}`);
      }

      return result;
    };
  }
}

function extendTranslator() {
  _getItems();
  _getText();
}

export default extendTranslator;
