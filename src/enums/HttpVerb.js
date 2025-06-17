import Enum from "@locustjs/enum";

const HttpVerb = Enum.define(
  { POST: 0, GET: 1, PUT: 2, DELETE: 3, OPTIONS: 4, HEAD: 5, PATCH: 6 },
  "HttpVerb"
);

export default HttpVerb;
