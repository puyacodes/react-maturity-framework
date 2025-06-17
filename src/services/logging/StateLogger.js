import { ChainLogger } from "@locustjs/logging";
import { loggingStore, loggingStoreVanilla } from "../../stores/logging";

class StateLogger extends ChainLogger {
  getState() {
    const _store =
      this.options.storeType == "react" ? loggingStore : loggingStoreVanilla;

    return _store.getState();
  }
  __logInternal(log) {
    this.getState().log(log);
  }
  getAll() {
    return this.getState().logs;
  }
  _clearInternal() {
    this.getState().clear();
  }
}

export default StateLogger;
