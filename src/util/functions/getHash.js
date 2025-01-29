import md5 from "md5";
import zip from "./zip";

function getHash(obj) {
  let result = zip(obj);

  result = md5(result);

  return result;
}

export default getHash;
