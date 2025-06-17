import { throwIfInstantiateAbstract, throwIfInvalid, throwIfNotObject, throwIfNotSomeString, throwNotImplementedException } from '@locustjs/exception';
import { LocatorBase } from '@locustjs/locator';
import { AjaxInterceptorBase, AjaxNoInterceptor } from '../ajax-interceptor';
import { isEmpty, isObject, isSomeArray, isSomeObject, isSomeString } from '@locustjs/base';
import { HttpVerb } from '../../enums';
import { ServiceResponse } from '@locustjs/services';
import { HostProvider } from '../../providers';
import BaseService from '../BaseService';
import { getProp, setProp } from '../../util/functions';

class AjaxBase extends BaseService {
    constructor(locator, hostPrvider, options) {
        super(locator, hostPrvider);

        throwIfInstantiateAbstract(AjaxBase, this);

        this.options = Object.assign({
            baseUrl: '',
            loginUrl: '',
            defaultMethod: 'POST',
            defaultRequestType: 'json'
        }, options);

        this.initDependency('interceptor', AjaxInterceptorBase, () => new AjaxNoInterceptor());
    }
    setHeader(headers, name, value, force) {
        if (isObject(headers)) {
            const _value = getProp(options.headers, name, true);

            if (isEmpty(_value) || force) {
                setProp(headers, name, (value || "")?.toString(), true);
            }
        }
    }
    setContentType(headers, value, force) {
        this.setHeader(headers, "Content-Type", value, force);
    }
    //#region private methods
    _invokeInternal(req, res) {
        throwNotImplementedException(`${this.name}._invokeInternal`, this);
    }
    _validateRequest(args) {
        const { request, response } = args;
        const { host } = this.hostPrvider;
        const { status } = response;
        const { baseUrl, defaultMethod } = this.options;

        try {
            throwIfNotObject(request, 'request', host);
            throwIfNotInstanceOf("response", ServiceResponse, response);

            if (isEmpty(request.url) && isSomeString(baseUrl)) {
                request.url = baseUrl;
            }

            throwIfNotSomeString(request.url, 'request.url', host);

            if (isEmpty(request.method) && isSomeString(defaultMethod)) {
                request.method = defaultMethod;
            }

            throwIfNotSomeString(request.method, 'request.method', host);

            request.method = request.method.toUpperCase();

            throwIfInvalid(request.method.toUpperCase(), 'request.method', value => HttpVerb.isValid(value), host);

            if (!isObject(request.headers)) {
                request.headers = {}
            }

            if (request.method == "GET" && (isSomeObject(request.files) || isSomeArray(request.files))) {
                response.setStatus('cannot-upload-in-get');
            }
        } catch (e) {
            response.setStatus('invalid-request').setException(e);
        }

        return status == response.status;
    }
    async _beforeInvoke({ response }) {
        const status = response.status;

        try {
            await this.interceptor.beforeInvoke(this, args);
        } catch (e) {
            response.setStatus('ajax-begin-invoke-failed').setException(e);
        }

        return status == response.status;
    }
    async _afterInvoke({ response }) {
        const status = response.status;

        try {
            await this.interceptor.afterInvoke(this, args);
        } catch (e) {
            response.setStatus('ajax-end-invoke-failed').setException(e);
        }

        return status == response.status;
    }
    async _invoke(args) {
        const { request, response } = args;
        const status = response.status;

        do {
            try {
                const res = await this._invokeInternal(request, response);

                /*
                    res structure:
                    {
                        ok: bool,
                        status: string,
                        redirected: bool,
                        url: string,
                        data: any (json or text)
                    }
                */

                args.innerResponse = res;

                if (status != response.status) {
                    break;
                }

                if (!res.ok) {
                    switch (res.status) {
                        case 401:
                            response.notAuthenticated();
                            break;
                        case 403:
                            response.notAuthorized();
                            break;
                        case 500:
                            response.setStatus("internal-error");
                            break;
                        default:
                            response.setStatus("http-error");
                            break;
                    }

                    response.setInfo(res.status);

                    break;
                }

                if (res.redirected) {
                    const redir = parse(res.url, true);

                    if (redir.pathname.toLowerCase().endsWith(this.options.loginUrl)) {
                        response.setStatus('login-required').setInfo(res.data);
                    } else {
                        response.setStatus('unknown-redir').setInfo(res.status);
                    }

                    break;
                }

                response.setData(res.data);
            } catch (e) {
                if (e.name == 'AbortError') {
                    response.setStatus('aborted');
                } else {

                    response.setStatus('network-error');
                }

                response.setException(e)
            }
        } while (false);

        return status == args.response.status;
    }
    _initRequest(method, ...args) {
        let req;

        if (args.length) {
            if (args.length == 1) {
                if (isObject(args[0])) {
                    /*
                        if args[0] is an object in the form { data: ..., headers } or { data: ..., url }
                        we assume it as to be the request itself. therwise we assume it as data.
                    */

                    if (!isEmpty(args[0].data) && (!isEmpty(args[0].url) || !isEmpty(args[0].headers))) {
                        req = { ...args[0], method }
                    } else {
                        req = { data: args[0], method }
                    }
                } else {
                    req = { url: args[0], method }
                }
            } else {
                const [url, data, headers, files] = args;

                req = { method, url, data, headers, files }
            }
        } else {
            req = { method }
        }

        return req;
    }
    //#endregion
    @Enrich
    async invoke(request) {
        /*
            request = {
                method,
                url,
                data,
                headers,
                files,
            };
        */

        const response = new ServiceResponse();
        const args = { request, response }

        do {
            if (!this._validateRequest(args)) {
                break;
            }

            if (!await this._beforeInvoke(args)) {
                break;
            }

            if (!await this._invoke(args)) {
                break;
            }

            if (!await this._afterInvoke(args)) {
                break;
            }

            args.response.succeeded();
        } while (false);

        return args.response;
    }
    //#region helpers
    post(...args) {
        const req = this._initRequest('POST', ...args);

        return this.invoke(req);
    }
    put(...args) {
        const req = this._initRequest('PUT', ...args);

        return this.invoke(req);
    }
    delete(...args) {
        const req = this._initRequest('DELETE', ...args);

        return this.invoke(req);
    }
    get(...args) {
        const req = this._initRequest('GET', ...args);

        return this.invoke(req);
    }
    patch(...args) {
        const req = this._initRequest('PATCH', ...args);

        return this.invoke(req);
    }
    //#endregion
}

AjaxBase.dependencies = [LocatorBase, HostProvider];

export default AjaxBase;
