import AjaxBase from './AjaxBase';

class AjaxNull extends AjaxBase {
    post() {
        return new Promise((res, rej) => {
            res();
        })
    }
    get() {
        return new Promise((res, rej) => {
            res();
        })
    }
    put() {
        return new Promise((res, rej) => {
            res();
        })
    }
    delete() {
        return new Promise((res, rej) => {
            res();
        })
    }
    patch() {
        return new Promise((res, rej) => {
            res();
        })
    }
}

export default AjaxNull;