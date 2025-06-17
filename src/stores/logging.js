import createStore from "../util/functions/createStore";

const store = createStore('logging', (set) => ({
  logs: [],
  log: (log) =>
    set((state) => ({
      logs: [...state.logs, { ...log, index: state.logs.length }],
    })),
  clear: (_) => set((_) => ({ logs: [] })),
}));

const loggingStore = store.loggingStore;
const loggingStoreVanilla = store.loggingStoreVanilla;

export default store;
export { loggingStore, loggingStoreVanilla }