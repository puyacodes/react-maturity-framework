import JsonSerializerBase from './JsonSerializerBase';

class JsonSerializerDefault extends JsonSerializerBase {
    stringify(obj) {
        return JSON.stringify(obj)
    }
    parse(str, ...args) {
        return JSON.parse(str, ...args)
    }
}

export default JsonSerializerDefault;