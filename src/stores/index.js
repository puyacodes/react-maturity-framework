import { createStore } from '../util/functions';
import logging from './logging'

let _stores;

function getStores() {
    return _stores;
}
function setStores(stores) {
    _stores = { ...logging }

    Object.keys(stores).forEach(key => {
        const _store = createStore(key, stores[key]);

        _stores = { ..._stores, ..._store }
    });
}

export {
    getStores, setStores
}