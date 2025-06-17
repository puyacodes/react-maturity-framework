import { NotImplementedException, throwIfInstantiateAbstract } from "@locustjs/exception";

class DebuggerBase {
  constructor() {
    throwIfInstantiateAbstract(DebuggerBase, this);
  }
  get debugMode() {
    throw NotImplementedException(`DebuggerBase.debugMode getter`)
  }
  set debugMode(value) {
    throw NotImplementedException(`DebuggerBase.debugMode setter`)
  }

  get logFilter() {
    throw NotImplementedException(`DebuggerBase.logFilter getter`)
  }
  set logFilter(value) {
    throw NotImplementedException(`DebuggerBase.logFilter setter`)
  }
  get logScopeFilter() {
    throw NotImplementedException(`DebuggerBase.logScopeFilter getter`)
  }
  set logScopeFilter(value) {
    throw NotImplementedException(`DebuggerBase.logScopeFilter setter`)
  }
}

export default DebuggerBase;
