import { useUser, useTheme, useLang } from "../contexts";
import { useState } from "../hooks";

const PartA = () => {
    const [, setUser] = useUser();
    const [, setTheme] = useTheme();
    const [, setLang] = useLang();
    const [get, set] = useState(0);

    const onClick = (name, set) => () => {
        const value = prompt(`Enter ${name}`)

        set(value)
    }

    const current = get()

    return <div>
        <h2>Part A</h2>
        <span>Count: {current}</span>
        <button onClick={onClick('Theme', setTheme)}>Set Theme</button>
        <button onClick={onClick('Lang', setLang)}>Set Lang</button>
        <button onClick={onClick('User', setUser)}>Set User</button>
        <button onClick={_ => set(current + 1)}>Increment</button>
    </div>
}

export default PartA;