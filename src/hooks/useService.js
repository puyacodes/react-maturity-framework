import resolve from "./resolve";

const useService = (abstraction, ...args) => {
  const result = resolve(abstraction, ...args);

  return result;
};

export default useService;
