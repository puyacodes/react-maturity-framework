import { throwNotImplementedException } from '@locustjs/exception';
import HostProvider from './HostProvider';
import BaseProvider from './BaseProvider';

class EnvironmentProvider extends BaseProvider {
    constructor(hostPrvider, env) {
        super(hostPrvider);

        this.env = env || {};
    }
    isDevelopment() {
        return this.mode == "development";
    }
    isProduction() {
        return this.mode == "production";
    }
    get mode() {
        throwNotImplementedException(`${this.constructor.name}.mode`, this.hostPrvider.host)
    }
}

EnvironmentProvider.dependencies = [HostProvider]

export default EnvironmentProvider;