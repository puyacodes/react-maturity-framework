import { isArray, isObject, isPrimitive } from "@locustjs/base";

function _createQuery(qs, obj, prefix, encodeKeys) {
    if (isPrimitive(obj)) {
        qs.push((encodeKeys ? encodeURIComponent(prefix) : prefix) + "=" + encodeURIComponent(obj));
    } else if (isArray(obj)) {
        for (let item of obj) {
            _createQuery(qs, item, prefix + '[]')
        }
    } else if (isObject(obj)) {
        for (const key in obj) {
            const value = obj[key];

            _createQuery(qs, value, prefix ? prefix + '.' + key : key);
        }
    }
}

function createQuery(obj, encodeKeys) {
    const qs = [];

    _createQuery(qs, obj, '', encodeKeys);

    return qs.join('&');
}

export default createQuery;