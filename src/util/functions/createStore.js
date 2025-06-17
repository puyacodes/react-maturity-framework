import { create } from "zustand";
import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";
import { isFunction } from '@locustjs/base';

const _createStore = (name, store) => {
    let s;
    let s1;
    let s2;

    if (isFunction(store)) {
        s = devtools(store);

        if (typeof createStore == "function") {
            s2 = createStore(s);
        } else {
            s2 = createStore.default(s);
        }

        if (typeof create == "function") {
            s1 = create(s);
        } else {
            s1 = create.default(s);
        }
    }

    return { [`${name}StoreVanilla`]: s1, [`${name}Store`]: s2 };
};

export default _createStore;