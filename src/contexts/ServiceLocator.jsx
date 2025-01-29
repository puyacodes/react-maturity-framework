import { createContext } from "react";
import { throwIfNotInstanceOf } from "locustjs-exception";
import { LocatorBase } from "locustjs-locator";

const ServiceLocatorContext = createContext();

const ServiceLocator = ({ locator, children }) => {
  throwIfNotInstanceOf("locator", LocatorBase, locator);

  return (
    <ServiceLocatorContext.Provider value={locator}>
      {children}
    </ServiceLocatorContext.Provider>
  );
};

export { ServiceLocatorContext, ServiceLocator };
