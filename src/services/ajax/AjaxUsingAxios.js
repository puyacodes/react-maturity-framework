import axios from "axios";
import AjaxBase from "./AjaxBase.js";

class AjaxUsingAxios extends AjaxBase {
  constructor(...args) {
    super(...args)

    this.axios = axios.create({});
  }
  async _invokeInternal(request) {
    let { method, url, headers, data, files, type, ...rest } = request;
    const _req = { method, url, headers, ...rest }

    if (isSomeObject(files) || isSomeArray(files)) {
      _req.data = this.webhelper.createForm(data, files)

      this.setContentType(_req.headers, "multipart/form-data");
    }
    
    const res = await this.axios.request(_req)

    return res;
  }
}

export default AjaxUsingAxios;
