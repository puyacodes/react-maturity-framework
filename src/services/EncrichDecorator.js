import { LoggerBase } from "@locustjs/logging";
import { DebuggerBase } from "./debugging";

function Enrich(target, context) {
    if (context && context.kind == "method") {
        return function (...args) {
            let result;
            const logging = this && this.logger && (this.logger instanceof LoggerBase)
            const debugging = this && this.debugger && (this.debugger instanceof DebuggerBase) && this.debugger.debugMode;
            
            if (logging) {
                this.logger.enterScope(target.name)
            }

            if (debugging) {
                this.logger.debug('arguments', ...args)
            }

            try {
                result = target(...args)
            } catch (ex) {
                if (logging) {
                    this.logger.danger(ex)
                }
            }

            if (debugging) {
                this.logger.debug('result', ...args)
            }

            if (logging) {
                this.logger.exitScope()
            }

            return result;
        }
    }
}

export default Enrich;