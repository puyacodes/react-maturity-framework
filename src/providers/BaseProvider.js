import { throwIfInstantiateAbstract, throwIfNotInstanceOf } from "@locustjs/exception";
import HostProvider from "./HostProvider";
import { isNullOrEmpty } from "@locustjs/base";

class BaseProvider {
    constructor(hostPrvider) {
        throwIfInstantiateAbstract(BaseProvider, this);

        this.hostPrvider = hostPrvider;

        if (isNullOrEmpty(hostPrvider)) {
            this.hostPrvider = new HostProvider();
        } else {
            throwIfNotInstanceOf("hostPrvider", HostProvider, hostPrvider);
        }
    }
    get name() {
        return this.constructor.name;
    }
}

export default BaseProvider;