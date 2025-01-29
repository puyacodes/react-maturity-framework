import { useContext } from "react";
import { ServiceLocatorContext } from "../contexts/ServiceLocator.jsx";

const useLocator = () => useContext(ServiceLocatorContext);

export default useLocator;