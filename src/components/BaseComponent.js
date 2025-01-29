import React from "react";
import { isFunction, isObject } from "locustjs-base";
import { preRaise, postRaise, isHandled } from "../functions/raiseEvent";

class BaseComponent extends React.Component {
  getProps() {
    return this.props;
  }
  getChildren() {
    return {
      ...(isFunction(this.children) ? this.children(this) : this.children),
    };
  }
  getDependencies() {
    return {
      locator: this.locator,
      logger: this.logger,
      translator: this.translator,
      debugger: this.debugger,
      identity: this.identity,
      config: this.config
    };
  }
  *eachChild() {
    const _children =
      (isFunction(this.children) ? this.children(result) : this.children) || {};

    for (let key of Object.keys(_children)) {
      yield _children[key];
    }
  }
  handle(handler, args) {
    return (e, ...rest) => {
      let result;
      const dependencies = this.getDependencies();

      if (!isObject(e)) {
        e = {};
      }

      const prevSourceIndex = preRaise(e, this, dependencies, args, ...rest);

      if (isFunction(handler)) {
        result = handler(e);

        postRaise(e, this, prevSourceIndex);
      }

      return result;
    };
  }
  raise(handler, e, args) {
    let ok;

    if (isFunction(handler)) {
      const dependencies = this.getDependencies();

      if (!isObject(e)) {
        e = {};
      }

      const prevSourceIndex = preRaise(e, this, dependencies, args);

      ok = handler(e);

      postRaise(e, this, prevSourceIndex);
    }

    return isHandled(ok);
  }
  raiseAsync(handler, e, args) {
    let ok;
    let prevSourceIndex;

    if (isFunction(handler)) {
      const dependencies = this.getDependencies();

      if (!isObject(e)) {
        e = {};
      }

      prevSourceIndex = preRaise(e, this, dependencies, args);

      ok = handler(e);
    }

    if (ok && isFunction(ok.then)) {
      return new Promise((res) =>
        ok.then((_ok) => {
          postRaise(e, this, prevSourceIndex);

          res(isHandled(_ok));
        })
      );
    } else {
      return new Promise((res) => {
        postRaise(e, this, prevSourceIndex);

        res(isHandled(ok));
      });
    }
  }
}

export default BaseComponent;
