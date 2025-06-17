import { throwIfInstantiateAbstract, throwNotImplementedException } from '@locustjs/exception';

class JsonSerializerBase {
    constructor() {
        throwIfInstantiateAbstract(JsonSerializerBase, this);
    }
    stringify(obj) {
        throwNotImplementedException(`${this.constructor.name}.stringify`)
    }
    parse(qs) {
        throwNotImplementedException(`${this.constructor.name}.parse`)
    }
}

export default JsonSerializerBase;