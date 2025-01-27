import { create } from "zustand";
import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";
import { isFunction } from 'locustjs-base';

const finalizeStore = (store, vanilla = false) => {
    let result;

    if (isFunction(store)) {
        result = devtools(store);

        if (vanilla) {
            if (typeof createStore == "function") {
                result = createStore(result);
            } else {
                result = createStore.default(result);
            }
        } else {
            if (typeof create == "function") {
                result = create(result);
            } else {
                result = create.default(result);
            }
        }
    }

    return result;
};

export default finalizeStore;
