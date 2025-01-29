import { DebuggerBase, DebuggerDefault } from "../services/debugging";
import useService from "./useService";

function useDebugger() {
  const result = useService(DebuggerBase) || new DebuggerDefault();

  return result;
}

export default useDebugger;
