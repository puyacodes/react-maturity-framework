import resolveBy from "./resolveBy";

const useServiceBy = (abstraction, state, ...args) => {
  const result = resolveBy(abstraction, state, ...args);

  return result;
};

export default useServiceBy;
