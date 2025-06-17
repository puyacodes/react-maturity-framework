import { isNumeric, hasBool, hasDate, isArray, set, query } from '@locustjs/base';

const parseQuery = function (url, convert = true, smart = false) {
    url = (url || '').toString().trim();

    const result = {};
    const pi = url.indexOf('://');

    let hasProtocol = false;

    if (pi >= 0) {
        url = url.substr(pi + 3);
        hasProtocol = true
    } else if (url.startsWith('//')) {
        url = url.substr(2);
        hasProtocol = true
    }

    const iq = url.indexOf('?');
    const ih = url.indexOf('#');

    let qs = '';

    if (iq >= 0) {
        if (ih > 0) {
            if (iq < ih) {
                if (ih - iq - 1 > 0) {
                    qs = url.substr(iq + 1, ih - iq - 1);
                }
            } else {
                if (!hasProtocol) {
                    qs = url.substr(0, ih);

                    if (qs.indexOf('=') < 0) {
                        qs = ''
                    }
                }
            }
        } else {
            qs = url.substr(iq + 1);
        }
    } else {
        if (ih >= 0) {
            if (!hasProtocol) {
                qs = url.substr(0, ih);
            }
        } else {
            if (!hasProtocol) {
                qs = url;
            }
        }

        if (qs.indexOf('=') < 0) {
            qs = ''
        }
    }

    if (qs) {
        qs.split('&').forEach(function (pair) {
            pair = (pair || '').trim();

            if (pair.length > 0) {
                const ei = pair.indexOf('=');

                if (ei < 0) {
                    if (result[pair] === undefined) {
                        result[pair] = null;
                    } else {
                        if (isArray(result[pair])) {
                            result[pair].push(null)
                        }
                    }
                } else {
                    let arr = false;
                    let key = decodeURIComponent(pair.substr(0, ei).trim());
                    const value = decodeURIComponent(pair.substr(ei + 1));

                    if (key.endsWith('[]')) {
                        key = key.substr(0, key.length - 2);
                        arr = true;

                        if (key.indexOf('.') > 0) {
                            if (query(result, key) == null) {
                                set(result, key, [])
                            }
                        } else {
                            if (result[key] === undefined) {
                                result[key] = []
                            }
                        }
                    }

                    let finalValue;

                    if (value && convert) {
                        if (isNumeric(value)) {
                            let convertedValue = Number(value);

                            if (isNaN(convertedValue)) {
                                convertedValue = parseFloat(value)
                            }

                            if (isNaN(convertedValue)) {
                                convertedValue = 0
                            }

                            finalValue = convertedValue
                        } else if (hasBool(value)) {
                            finalValue = value.toLowerCase().trim().toLocaleLowerCase() == 'true' ? true : false;
                        } else if (hasDate(value)) {
                            finalValue = Date.parse(value);
                        } else {
                            if (
                                (value[0] == '{' && value[value.length - 1] == '}') ||
                                (value[0] == '[' && value[value.length - 1] == ']')
                            ) {
                                try {
                                    finalValue = JSON.parse(value);
                                } catch {
                                    finalValue = value;
                                }
                            } else {
                                if (smart) {
                                    if (value == 'null') {
                                        finalValue = null;
                                    } else if (value == 'undefined') {
                                        finalValue = undefined;
                                    } else {
                                        finalValue = value;
                                    }
                                } else {
                                    finalValue = value;
                                }
                            }
                        }
                    } else {
                        finalValue = value;
                    }

                    if (key.indexOf('.') > 0) {
                        if (arr) {
                            if (query(result, key) == null) {
                                set(result, key, [finalValue]);
                            } else {
                                query(result, key).push(finalValue)
                            }
                        } else {
                            set(result, key, finalValue);
                        }
                    } else {
                        if (result[key] === undefined) {
                            result[key] = finalValue;
                        } else {
                            if (arr) {
                                result[key].push(finalValue)
                            } else {
                                result[key] = finalValue
                            }
                        }
                    }

                }
            }
        });
    }

    return result;
}

export default parseQuery;