import merge from "lodash/merge";

function mergeLocales(prefix, locales) {
  let result = {};

  for (let lang of Object.keys(locales)) {
    result = merge(result, {
      [lang]: {
        translation: {
          [prefix]: locales[lang],
        },
      },
    });
  }

  return result;
}

export default mergeLocales;
