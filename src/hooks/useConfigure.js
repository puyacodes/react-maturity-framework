import { useState } from "react";
import { useJob } from "./useJob";
import configure from "../configure";

function useConfigure(config) {
    const [store, setStore] = useState({
        config: {},
        appSettings: {},
        user: {},
        userSettings: {},
        locator: null,
    });

    useJob(
        () => configure(config),
        setStore
    );

    return [store, setStore];
}

export default useConfigure;
