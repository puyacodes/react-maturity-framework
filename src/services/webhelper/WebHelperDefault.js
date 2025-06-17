import { isNullOrUndefined } from '@locustjs/base';
import { createForm, createQuery, parseQuery } from '../../util/functions';
import { FormDataProvider, HostProvider, LocationProvider } from '../../providers';
import WebHelperBase from './WebHelperBase';

class WebHelperDefaultDefault extends WebHelperBase {
    createQuery(obj, encodeKeys) {
        const _encodeKeys = isNullOrUndefined(encodeKeys) ? this.encodeKeys : false;

        return createQuery(obj, _encodeKeys);
    }
    parseQuery(qs) {
        if (isNullOrUndefined(qs)) {
            const location = this.locationProvider.location;

            qs = location.toString();
        }

        return parseQuery(qs);
    }
    createForm(data, files, encodeKeys) {
        const _encodeKeys = isNullOrUndefined(encodeKeys) ? this.encodeKeys : false;
        const FormDataType = this.formDataProvider.FormDataType;

        return createForm(data, files, _encodeKeys, FormDataType);
    }
}

WebHelperDefaultDefault.dependencies = [
    LocationProvider,
    FormDataProvider,
    HostProvider
]

export default WebHelperDefaultDefault;