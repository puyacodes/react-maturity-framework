import { useEffect, useState } from "react";
import { isArray, isFunction } from "locustjs-base";

const useJob = (fn, next, deps, onUnmount) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    let _fn = isFunction(fn) ? fn : () => fn;
    let _deps = deps;
    let _next = next;

    if (isArray(next) && deps === undefined) {
        _deps = next;
    }

    if (_deps == null) {
        _deps = [];
    }

    if (!isArray(_deps)) {
        _deps = [_deps];
    }

    useEffect(() => {
        let mount = true;

        setLoading(true);

        try {
            const r = _fn();

            if (r && isFunction(r.then)) {
                r.then((...args) => {
                    if (mount) {
                        if (isFunction(_next)) {
                            const _r = _next(...args);

                            if (_r && isFunction(_r.then)) {
                                _r.then(() => setLoading(false))
                                    .catch((err) => setError(err));
                            } else {
                                setLoading(false);
                            }
                        } else {
                            setLoading(false);
                        }
                    }
                }).catch((err) => setError(err));
            } else {
                if (mount) {
                    if (isFunction(_next)) {
                        try {
                            const _r = _next(r);

                            if (_r && isFunction(_r.then)) {
                                _r.then(() => setLoading(false)).catch((err) => setError(err));
                            } else {
                                setLoading(false);
                            }
                        } catch (err) {
                            setError(err);

                            if (loading) {
                                setLoading(false);
                            }
                        }
                    } else {
                        setLoading(false);
                    }
                }
            }
        } catch (err) {
            if (mount) {
                setError(err);

                if (loading) {
                    setLoading(false);
                }
            } else {
                // component unmounted and error is going to lose!
                // console.log() it as a last resort:

                console.log(err);
            }
        }

        return () => {
            mount = false;

            if (isFunction(onUnmount)) {
                try {
                    onUnmount();
                } catch (err) {
                    // component unmount is crashed too!

                    console.log(err);
                }
            }
        };
    }, _deps);

    if (error) {
        throw error;
    }

    return loading;
};

export default useJob;
