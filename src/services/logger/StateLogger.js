import { ChainLogger } from "locustjs-logging";
import { loggingStore, loggingVanillaStore } from "../../stores/logging";

class StateLogger extends ChainLogger {
  getState() {
    const { getState } =
      this.options.storeType == "react" ? loggingStore : loggingVanillaStore;

    return getState();
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
