import finalizeStore from "../helpers/finalizeStore";

const loggingStore = finalizeStore((set) => ({
  logs: [],
  log: (log) => set((state) => ({ logs: [...state.logs, log] })),
  clear: (_) => set((_) => ({ logs: [] })),
}));


const loggingVanillaStore = finalizeStore((set) => ({
  logs: [],
  log: (log) =>
    set((state) => ({
      logs: [...state.logs, { ...log, index: state.logs.length }],
    })),
  clear: (_) => set((_) => ({ logs: [] })),
}), true);

export { loggingStore, loggingVanillaStore };
