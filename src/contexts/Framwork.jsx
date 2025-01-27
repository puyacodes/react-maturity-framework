import React, { createContext } from "react";
import useConfigure from "../hooks/useConfigure";

const FrameworkContext = createContext([{}, () => ({})]);

const Framework = ({ config, children }) => {
  const value = useConfigure(config);

  return (
    <FrameworkContext.Provider value={value}>
      {children}
    </FrameworkContext.Provider>
  );
};

export { FrameworkContext, Framework };
