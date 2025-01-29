import useLocator from "./useLocator";

const resolveBy = (abstraction, state, ...args) => {
  const locator = useLocator();

  return locator && locator.resolveBy(abstraction, state, ...args);
};

export default resolveBy;
