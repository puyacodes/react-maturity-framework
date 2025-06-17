import { isNullOrEmpty } from "@locustjs/base";
import { throwIfNotString } from "@locustjs/exception";

class HostProvider {
    constructor(host) {
        this.host = host;

        if (!isNullOrEmpty(host)) {
            throwIfNotString(host, 'host');
        }
    }
}

export default HostProvider;