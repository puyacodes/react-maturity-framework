import { isArray, isObject, isPrimitive } from "@locustjs/base";
import { throwIfNotFunction } from "@locustjs/exception";

function _createForm(formData, obj, prefix, encodeKeys) {
    if (isPrimitive(obj)) {
        formData.append((encodeKeys ? encodeURIComponent(prefix) : prefix), obj.toString());
    } else if (isArray(obj)) {
        for (let item of obj) {
            _createForm(formData, item, prefix + '[]')
        }
    } else if (isObject(obj)) {
        for (const key in obj) {
            const value = obj[key];

            _createForm(formData, value, prefix ? prefix + '.' + key : key);
        }
    }
}

function createForm(data, files, encodeKeys, FormDataType) {
    FormDataType = FormDataType == null ? typeof window == "undefined" ? null : window.FormData : FormDataType;

    throwIfNotFunction(FormDataType, "FormDataType");

    const result = new FormDataType();

    _createForm(result, data, '', encodeKeys);

    if (isObject(files)) {
        for (let key of Object.keys(files)) {
            result.append(key, files[key]);
        }
    } else if (isArray(files)) {
        let i = 0;

        for (let file of files) {
            result.append(`file${i++}`, file);
        }
    }

    return result;
}

export default createForm;