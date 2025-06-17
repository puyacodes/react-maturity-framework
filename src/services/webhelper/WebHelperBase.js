import { throwIfInstantiateAbstract, throwIfNotInstanceOf, throwIfNotString, throwNotImplementedException } from '@locustjs/exception';
import {FormDataProvider, LocationProvider, BaseProvider} from '../../providers';

class WebHelperBase extends BaseProvider {
    constructor(locationProvider, formDataProvider, hostPrvider) {
        super(hostPrvider);

        throwIfInstantiateAbstract(WebHelperBase, this);

        const host = this.hostPrvider.host;

        throwIfNotInstanceOf('locationProvider', LocationProvider, locationProvider, false, host)
        throwIfNotInstanceOf('formDataProvider', FormDataProvider, formDataProvider, false, host)
        
        this.locationProvider = locationProvider;
        this.formDataProvider = formDataProvider;
    }
    createQuery(obj, encodeKeys) {
        throwNotImplementedException(`${this.constructor.name}.createQuery`)
    }
    parseQuery(qs) {
        throwNotImplementedException(`${this.constructor.name}.parseQuery`)
    }
    createForm(data, files, encodeKeys) {
        throwNotImplementedException(`${this.constructor.name}.createForm`)
    }
    buildUrl(url, parameters) {
        throwIfNotString(url, 'url');

        const iq = url.indexOf('?');
        const ih = url.indexOf('#');
        const _url = iq < ih || ih < 0 ? url.substr(0, iq - 1) : url;
        const obj = url ? this.parseQuery(url) : {};
        const params = { ...obj, ...parameters };
        const qs = this.createQuery(params);
        const fullUrl = qs.length ? _url + '?' + qs : _url;

        return { url: _url, params, qs, fullUrl };
    }
}

export default WebHelperBase;