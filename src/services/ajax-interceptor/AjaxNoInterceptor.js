import AjaxInterceptorBase from "./AjaxInterceptorBase"

class AjaxNoInterceptor extends AjaxInterceptorBase {
  beforeInvoke(source, x) { }
  afterInvoke(source, x) { }
}

export default AjaxNoInterceptor;
