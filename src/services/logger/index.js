import { DynamicLogger } from "locustjs-logging";
import StateLogger from "./StateLogger";

class Logger extends DynamicLogger {
    constructor(options) {
        super({
            ...options,
            factory: function (x, type) {
                if (type == "state") {
                    return new StateLogger({ storeType: "react" });
                }
            },
        });
    }
}

export default Logger;
