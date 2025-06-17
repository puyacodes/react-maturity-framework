import { throwIfInstantiateAbstract, throwNotImplementedException } from '@locustjs/exception';

class AjaxInterceptorBase {
  constructor() {
    throwIfInstantiateAbstract(AjaxInterceptorBase, this);
  }
  beforeInvoke(source, x) {
    throwNotImplementedException('AjaxInterceptorBase.beforeInvoke', this);
  }
  afterInvoke(source, x) {
    throwNotImplementedException('AjaxInterceptorBase.afterInvoke', this);
  }
}

export default AjaxInterceptorBase;
