import React, { createContext, useState, useContext } from "react";

class AppContext {
    constructor(...names) {
        this.createContexts(...names)
    }
    static createContext(name, state) {
        name = name[0].toUpperCase() + name.substr(1);

        const Context = createContext([state, () => state]);

        const Provider = (props) => {
            const { [name]: _state, children } = props;

            const [value, setValue] = useState(_state || state);

            return (
                <Context.Provider value={[value, setValue]}>
                    {children}
                </Context.Provider>
            );
        }

        function use() {
            const value = useContext(Context);

            return value;
        }

        return { [name + 'Context']: Context, [name]: Provider, ['use' + name]: use };
    }
    createContexts(...names) {
        this.contexts = {}
        this.hooks = {}
        this.providers = {}
        this.elements = []

        for (let name of names) {
            let _name, _state;

            if (Array.isArray(name)) {
                _name = name[0];
                _state = name[1];
            } else {
                _name = name
            }

            const ctx = AppContext.createContext(_name, _state);

            const Provider = ctx[_name];
            const context = ctx[_name + 'Context'];
            const hook = ctx['use' + _name];


            this.elements.push(<Provider />);
            this.providers[_name] = Provider;
            this.contexts[_name] = context;
            this.hooks['use' + _name] = hook
        }
    }

    createApp(child) {
        const _elements = [...this.elements]

        if (child) {
            _elements.push(child);
        }

        const root = _elements.reduceRight((prev, ctx) => React.cloneElement(ctx, {}, prev))

        return () => <>{root}</>;
    }
}


export default AppContext;

/*
Example:
./appContext.js
import AppContext from "../contexts/AppContext";
const appContext = new AppContext(['Lang', 'en'], 'Theme', 'User');
const { useUser, useTheme, useLang } = appContext.hooks;
export default appContext;
export { useUser, useTheme, useLang }
=======================================================
./App.jsx
import appContext from "./appContext";
import './App.css'
const App = appContext.createApp(<>
        <h1>My App</h1>
    </>);
    
export default App;
*/