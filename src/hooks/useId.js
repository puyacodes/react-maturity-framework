import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { isSomeString } from "@locustjs/base";

const useId = (id) => {
  const [_id, setId] = useState();

  useEffect(() => {
    if (!isSomeString(id)) {
      const newId = uuidv4();

      setId(newId);
    } else {
      setId(id);
    }
  }, [id]);

  return _id;
};

export default useId;
