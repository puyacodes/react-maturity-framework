import useLocator from "./useLocator";

const resolve = (abstraction, ...args) => {
  const locator = useLocator();

  return locator && locator.resolve(abstraction, ...args);
};

export default resolve;
