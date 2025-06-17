import Enum from "@locustjs/enum";

const HttpBodyType = Enum.define(
  { text: 0, form: 1, json: 2, xml: 3 },
  "HttpBodyType"
);

export default HttpBodyType;
