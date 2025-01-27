import { useContext } from "react";
import { FrameworkContext } from "../contexts/FrameworkContext";

function useFramework() {
  const [store] = useContext(FrameworkContext);

  return store;
}

export default useFramework;
