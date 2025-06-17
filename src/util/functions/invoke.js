import { isFunction } from "@locustjs/base";
import { ServiceResponse } from "@locustjs/services";

function invoke(fn, ...args) {
  if (isFunction(fn)) {
    try {
      const r = fn(...args);

      if (r && isFunction(r.then)) {
        return new Promise(res => {
          r.then(x => {
            if (x instanceof ServiceResponse) {
              res(x);
            } else {
              return ServiceResponse.succeeded(x);
            }
          }).catch((e) => res(ServiceResponse.faulted(e)))
        });
      } else {
        if (r instanceof ServiceResponse) {
          return r;
        } else {
          return ServiceResponse.succeeded(x);
        }
      }
    } catch (e) {
      return ServiceResponse.faulted(e);
    }
  } else {
    return ServiceResponse.status("NotAFunction");
  }
}

export default invoke;
