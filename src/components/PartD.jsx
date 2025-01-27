import { useLang } from "../contexts";

const PartD = () => {
    const [lang] = useLang();

    console.log('PartD', { lang })

    return <div>
        <h2>Part D</h2>
        <b>Lang</b>: <span>{JSON.stringify(lang)}</span>
    </div>
}

export default PartD;