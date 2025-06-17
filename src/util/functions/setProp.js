import { isObjectish } from "@locustjs/base";

function setProp(obj, prop, value, caseIncensitive = false) {
    let result;

    if (isObjectish(obj)) {
        for (let key of Object.keys(obj)) {
            if (prop == key || (caseIncensitive && prop.toLowerCase() == key.toLowerCase())) {
                obj[key] = value;
                result = true;
                break;
            }
        }

        if (!result) {
            obj[prop] = value;
        }
    }

    return result;
}

export default setProp;