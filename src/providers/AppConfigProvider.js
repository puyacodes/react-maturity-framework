import { throwIfNotObject } from "@locustjs/exception";

class AppConfigProvider {
    constructor(config) {
        this.config = config;

        throwIfNotObject(config, 'config');
    }
}

export default AppConfigProvider;