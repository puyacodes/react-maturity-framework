import {
    isFunction,
    isObject,
    isSomeArray,
    isSomeString,
    isString,
} from "@locustjs/base";
import { getStores } from '../stores';

const useStore = (name, members, vanilla = false) => {
    let result;
    const stores = getStores();
    const store = vanilla ? stores[`${name}StoreVanilla`] : stores[`${name}Store`];

    if (isString(members)) {
        members = members
            .split(",")
            .map((x) => (isSomeString(x) ? x.trim().replace(/\s/g, "") : ""));
    }

    if (isSomeArray(members)) {
        if (isFunction(store)) {
            if (members.length > 1) {
                result = {};

                for (let member of members) {
                    if (member) {
                        result[member] = store((s) => s[member]);
                    }
                }
            } else {
                result = store((s) => s[members[0]]);
            }
        } else if (isObject(store) && isFunction(store.getState)) {
            const state = store.getState();

            if (members.length > 1) {
                result = {};

                for (let member of members) {
                    result[member] = state[member];
                }
            } else {
                result = state[members[0]];
            }
        }
    }

    return result;
};

export default useStore;
