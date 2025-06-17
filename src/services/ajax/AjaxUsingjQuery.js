import AjaxBase from "./AjaxBase";
import { isEmpty } from "@locustjs/base";

const $ = typeof window != 'undefined' ? window.jQuery: undefined;

class AjaxUsingjQuery extends AjaxBase {
  invoke(method, url, data, headers, files, interceptor) {
    if (isEmpty(interceptor)) {
      interceptor = {
        beforeInvoke: (x) => x,
        afterInvoke: (x) => x,
      };
    }

    if (isEmpty(headers)) {
      headers = {};
    }

    return new Promise((resolve, reject) => {
      data = interceptor.beforeInvoke(data);

      if ($) {
        $.ajax({
          url: url,
          data: data,
          method: method,
          xhrFields: { withCredentials: true },
          headers: headers,
          success: function (result) {
            result = interceptor.afterInvoke(result);

            resolve(result);
          },
          fail: function (err) {
            reject(err);
          },
        });
      } else {
        reject('AjaxUsingjQuery: jQuery not found.');
      }
    });
  }
}

export default AjaxUsingjQuery;
