import { isNullOrEmpty } from "@locustjs/base";
import { throwIfNotObject } from "@locustjs/exception";
import HostProvider from "./HostProvider";
import BaseProvider from "./BaseProvider";

class LocationProvider extends BaseProvider {
    constructor(hostPrvider, location) {
        super(hostPrvider);

        this.location = location;

        if (isNullOrEmpty(location) && typeof window != "undefined") {
            this.location = window.location;
        }

        throwIfNotObject(this.location, 'location', this.hostPrvider.host);
    }
}

LocationProvider.dependencies = [HostProvider]

export default LocationProvider;