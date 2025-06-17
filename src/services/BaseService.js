import { LocatorBase } from '@locustjs/locator';
import { ChainLogger, LoggerBase, NullLogger } from "@locustjs/logging";
import { DebuggerBase, DebuggerDefault } from './debugging';
import { BaseProvider } from '../providers';
import { isFunction } from '@locustjs/base';

class BaseService extends BaseProvider {
    constructor(locator, hostPrvider) {
        super(hostPrvider);

        throwIfInstantiateAbstract(BaseService, this);
        throwIfNotInstanceOf("locator", LocatorBase, locator);

        this.locator = locator;

        this.initDependency('logger', LoggerBase, () => new NullLogger);
        this.initDependency('debugger', DebuggerBase, () => new DebuggerDefault());
    }
    initDependency(name, BaseType, factory, ...args) {
        this[name] = locator.exists(BaseType) ? (args.length ? locator.resolveBy(BaseType, ...args) : locator.resolve(BaseType)) : null;

        if (isNullOrUndefined(this[name])) {
            if (!isFunction(factory)) {
                this[name] = new BaseType(...args);
            } else {
                this[name] = factory(this);
            }
        }

        throwIfNotInstanceOf(name, BaseType, this[name]);
    }
    debug(...args) {
        if (this.debugger.debugMode) {
            this._prepareLogger();

            this.logger.debug(...args)
        }
    }
}

BaseService.prototype._prepareLogger = function () {
    if (this.logger instanceof ChainLogger) {
        this.logger.options.filter = this.debugger.logFilter;
        this.logger.options.scopeFilter = this.debugger.logScopeFilter;
    }
}

function _log(...args) {
    this._prepareLogger();
    this.logger[name](...args);
}

BaseService.prototype.info = _log;
BaseService.prototype.log = _log;
BaseService.prototype.trace = _log;
BaseService.prototype.warn = _log;
BaseService.prototype.danger = _log;
BaseService.prototype.success = _log;
BaseService.prototype.fail = _log;
BaseService.prototype.abort = _log;
BaseService.prototype.suggest = _log;
BaseService.prototype.cance = _log;

export default BaseService;