import { throwIfNotFunction } from "@locustjs/exception";
import HostProvider from "./HostProvider";
import BaseProvider from "./BaseProvider";

class FetchProvider extends BaseProvider {
    constructor(hostPrvider, fetch) {
        super(hostPrvider);

        this.fetch = fetch;

        if (isNullOrEmpty(fetch) && typeof window != "undefined") {
            this.fetch = window.fetch;
        }

        throwIfNotFunction(fetch, 'fetch', this.hostPrvider.host)
    }
}

FetchProvider.dependencies = [HostProvider]

export default FetchProvider;