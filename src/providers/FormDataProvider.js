import { isFunction, isNullOrEmpty } from "@locustjs/base";
import { throwIfNotFunction } from "@locustjs/exception";
import HostProvider from "./HostProvider";
import BaseProvider from "./BaseProvider";

class FormDataProvider extends BaseProvider {
    constructor(hostPrvider, FormDataType) {
        super(hostPrvider);

        this.FormDataType = FormDataType;

        if (isNullOrEmpty(FormDataType) && typeof window != "undefined") {
            this.FormDataType = window.FormData;
        }

        throwIfNotFunction(FormDataType, 'FormDataType', this.hostPrvider.host);
    }
    createFormData() {
        if (isFunction(this.FormDataType)) {
            return new this.FormDataType()
        }
    }
}

FormDataProvider.dependencies = [HostProvider]

export default FormDataProvider;