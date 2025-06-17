import { isSomeObject } from "@locustjs/base";

function getProp(obj, prop, caseIncensitive = false) {
    let result;

    if (isSomeObject(obj)) {
        for (let key of Object.keys(obj)) {
            if (prop == key || (caseIncensitive && prop.toLowerCase() == key.toLowerCase())) {
                result = obj[key];
                break;
            }
        }
    }

    return result;
}

export default getProp;