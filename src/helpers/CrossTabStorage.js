class CrossTabStorage {
    constructor(logger) {
        this.init();
        this._ready = false;
        this._logger = logger;
    }

    init() {
        this._askForSessionStorage();

        window.addEventListener(
            "storage",
            this._storageEventHandler.bind(this),
            false
        );
    }

    setItem(key, value) {
        sessionStorage.setItem(key, value);

        this._broadcastSessionStorage();
    }

    getItem(key) {
        const maxPoll = 20;

        return new Promise((res) => {
            let poll = 0;
            const _this = this;

            const timer = setInterval(() => {
                this._logger.enterScope(`CrossTabStorage.getKey::pol(${poll})`)

                if (sessionStorage.length) {
                    this._logger.debug("CrossTabStorage: session exists");

                    _this._ready = true;

                    clearInterval(timer);

                    res(sessionStorage[key]);
                } else {
                    if (poll == maxPoll) {
                        this._logger.debug("CrossTabStorage: timeout");

                        clearInterval(timer);

                        _this._ready = true;

                        res("");
                    } else {
                        if (_this._ready) {
                            this._logger.debug("CrossTabStorage: ready");

                            const value = sessionStorage.getItem(key);

                            clearInterval(timer);

                            res(value);
                        } else {
                            //   this._logger.debug(`CrossTabStorage: poll`);

                            poll++;
                        }
                    }
                }

                this._logger.exitScope();
            }, 100);
        });
    }

    removeItem(key) {
        sessionStorage.removeItem(key);

        this._broadcastSessionStorage();
    }

    _askForSessionStorage() {
        localStorage.setItem("getSessionStorage", "request");

        setTimeout(() => {
            localStorage.removeItem("getSessionStorage");
        }, 2000);
    }

    _syncSessionStorage() {
        const sessionStorageData = localStorage.getItem("sessionStorage");

        if (sessionStorageData) {
            const data = JSON.parse(sessionStorageData);

            for (const key in data) {
                sessionStorage.setItem(key, data[key]);
            }

            const keys = Object.keys(data);
            const removings = [];

            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);

                if (keys.indexOf(key) < 0) {
                    removings.push(key);
                }
            }

            removings.forEach((key) => sessionStorage.removeItem(key));

            this._ready = true;

            setTimeout(() => {
                localStorage.removeItem("sessionStorage");
            }, 2000);
        }
    }

    _broadcastSessionStorage() {
        const data = {};

        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            data[key] = sessionStorage.getItem(key);
        }

        localStorage.setItem("sessionStorage", JSON.stringify(data));

        setTimeout(() => {
            localStorage.removeItem("sessionStorage");
        }, 2000);
    }

    _storageEventHandler(event) {
        if (event.key === "getSessionStorage") {
            this._broadcastSessionStorage();
        } else if (event.key === "sessionStorage") {
            this._syncSessionStorage();
        }
    }
}

export default CrossTabStorage;
