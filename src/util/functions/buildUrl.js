import { throwIfNotString } from "@locustjs/exception";
import createQuery from "./createQuery";
import parseQuery from "./parseQuery";

function buildUrl(url, parameters, encodeKeys) {
    throwIfNotString(url, 'url');

    const iq = url.indexOf('?');
    const _url = iq >= 0 ? url.substr(iq + 1) : url;
    const obj = parseQuery(url)
    const qs = createQuery({ ...obj, ...parameters }, encodeKeys);

    if (qs.length) {
        _url += _url + '?' + qs;
    }

    return _url;
}

export default buildUrl;