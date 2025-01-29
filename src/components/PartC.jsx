import { useCallback, useState } from "react";
import { useTheme } from "../contexts";
import useEvent from "../hooks/useEvent";

const PartC = () => {
    const [theme] = useTheme();
    const [active, setActive] = useState(true);
    const [capture, setCapture] = useState(false);
    const [count, setCount] = useState(0)

    console.log('PartC', { theme })

    const onClick = useCallback((e) => console.log(`${e.currentTarget.tagName}, ${e.target.tagName}: clicked`), [active, capture]);

    useEvent('click', '.e1', onClick, active, capture)

    return <div>
        <h2>Part C</h2>
        <b>Theme</b>: <span>{JSON.stringify(theme)}</span>
        <div>Count: {count}</div>
        Active <input type="checkbox" onChange={_ => setActive(!active)} checked={active} />
        Capture <input type="checkbox" onChange={_ => setCapture(!capture)} checked={capture} />
        <button onClick={_ => setCount(count + 1)}>Increment</button>
        <div className="e1">
            <p className="e1">
                <button className="e1">Test</button>
            </p>
        </div>
    </div>
}

export default PartC;