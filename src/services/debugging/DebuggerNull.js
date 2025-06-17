import DebuggerBase from "./DebuggerBase";

class DebuggerNull extends DebuggerBase {
  get debugMode() {
    return false;
  }
  set debugMode(value) { }
  get logFilter() {
    return "";
  }
  set logFilter(value) {
  }
  get logScopeFilter() {
    return "";
  }
  set logScopeFilter(value) {
  }
}

export default DebuggerNull;
