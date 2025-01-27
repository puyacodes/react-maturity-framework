import finalizeStore from "../helpers/finalizeStore";

const store = (set) => ({
  logs: [],
  log: (log) =>
    set((state) => ({
      logs: [...state.logs, { ...log, index: state.logs.length }],
    })),
  clear: (_) => set((_) => ({ logs: [] })),
});

const loggingStore = finalizeStore(store, false);
const loggingVanillaStore = finalizeStore(store, true);

export { loggingStore, loggingVanillaStore };
