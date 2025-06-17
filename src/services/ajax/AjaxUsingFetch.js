import AjaxBase from "./AjaxBase.js";
import { isFunction, isNullOrEmpty, isString, isSomeArray, isSomeObject } from "@locustjs/base";
import { Exception, throwIfNotString } from "@locustjs/exception";
import { HttpBodyType } from '../../enums/index.js';
import FetchProvider from "../../providers/FetchProvider.js";
import { WebHelperBase, WebHelperDefault } from '../webhelper';
import { JsonSerializerBase, JsonSerializerDefault } from '../json-serializer';
import { FormDataProvider, LocationProvider } from '../../providers';

class AjaxUsingFetch extends AjaxBase {
  constructor(locator, options) {
    super(locator, options);

    this.initDependency('locationProvider', LocationProvider);
    this.initDependency('fetchProvider', FetchProvider);
    this.initDependency('formDataProvider', FormDataProvider);
    this.initDependency('jsonSerializer', JsonSerializerBase, () => new JsonSerializerDefault());
    this.initDependency('webhelper', WebHelperBase, (x) => WebHelperDefault(x.locationProvider, x.formDataProvider, x.hostPrvider));

    if (!isFunction(this.fetchProvider.fetch)) {
      throw new Exception({
        message: "fetch must be a function",
        status: "fetch-not-func",
      });
    }
  }
  async _invokeInternal(request) {
    let { method, url, headers, data, files, type, ...rest } = request;
    const { host } = this.hostPrvider;

    let options = {  // TODO
      method,
      headers: {
        Accept: "application/json",
        ...headers,
      },
      credentials: "include"
    };

    if (method == "GET") {
      const { fullUrl, params } = this.webhelper.buildUrl(request.url, request.data);

      request.url = fullUrl;
      request.data = params;
    } else {
      if (isSomeObject(files) || isSomeArray(files)) {
        const formData = this.webhelper.createForm(data, files)

        options.body = formData;

        this.setContentType(options.headers, "multipart/form-data");
      } else {  // TODO
        type = HttpBodyType.getNumber(type, this.options.defaultRequestType);

        switch (type) {
          case HttpBodyType.json:
            if (!isNullOrEmpty(data)) {
              options.body = isString(data)
                ? data
                : this.jsonSerializer.stringify(data);

            }

            this.setContentType(options.headers, "application/json");
            break;
          case HttpBodyType.form: // ? should be tested
            options.body = this.webhelper.createForm(data);

            this.setContentType(options.headers, 'application/x-www-form-urlencoded');
            break;
          case HttpBodyType.xml:
            if (!isString(data)) {
              throwIfNotString(data, 'request.data', host);
            }

            options.body = data;

            this.setContentType(options.headers, "text/xml");
            break;
          default:
            if (!isString(data)) {
              throwIfNotString(data, 'request.data', host);
            }

            options.body = data;
            break;
        }
      }
    }

    options = { ...options, ...rest }

    const { fetch } = this.fetchProvider;
    const res = await fetch(request.url, options);
    const contentType = res.headers.get("content-type")?.toLowerCase();
    let _data;

    if (contentType && contentType.indexOf("application/json") !== -1) {
      _data = await res.json();
    } else {
      _data = await res.text();
    }

    return { ...res, data: _data };
  }
}

export default AjaxUsingFetch;
