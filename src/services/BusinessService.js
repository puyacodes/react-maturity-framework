import { ServiceResponse } from '@locustjs/services';
import BaseService from './BaseService';
import { isFunction, isNullOrUndefined } from '@locustjs/base';

class BusinessService extends BaseService {
    run(request, fn) {
        this.logger.enterScope(`${this.name}.${(fn && fn.name) || 'run'}`);
        this.debug('request', request);

        const response = new ServiceResponse();

        if (isNullOrUndefined(fn)) {
            response.setStatus("no-fn")
        } else if (!isFunction(fn)) {
            response.setStatus("invalid-fn")
        } else {
            try {
                fn(request, response);
            } catch (e) {
                response.faulted(e);
            }
        }

        this.debug('response', response);
        this.logger.exitScope();

        return response;
    }
}

export default BusinessService;