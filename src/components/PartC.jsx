import { useTheme } from "../contexts";

const PartC = () => {
    const [theme] = useTheme();

    console.log('PartC', { theme })

    return <div>
        <h2>Part C</h2>
        <b>Theme</b>: <span>{JSON.stringify(theme)}</span>
    </div>
}

export default PartC;