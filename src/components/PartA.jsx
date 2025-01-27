import { useUser, useTheme, useLang } from "../contexts";

const PartA = () => {
    const [, setUser] = useUser();
    const [, setTheme] = useTheme();
    const [, setLang] = useLang();

    const onClick = (name, set) => () => {
        const value = prompt(`Enter ${name}`)

        set(value)
    }

    return <div>
        <h2>Part A</h2>
        <button onClick={onClick('Theme', setTheme)}>Set Theme</button>
        <button onClick={onClick('Lang', setLang)}>Set Lang</button>
        <button onClick={onClick('User', setUser)}>Set User</button>
    </div>
}

export default PartA;