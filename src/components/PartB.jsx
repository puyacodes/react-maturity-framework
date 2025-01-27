import { useEffect, useState } from "react";
import { useUser } from "../contexts";
import { useState as _useState } from "../hooks";

const PartB = () => {
    const [user] = useUser();
    const [count1, setCount1] = _useState(0);
    const [count2, setCount2] = useState(0);

    useEffect(() => console.log('PartB', { user }), [user])

    const getCount1 = () => {
        console.log(`getCount1: ${count1()}`)
    }
    const getCount2 = () => {
        console.log(`getCount2: ${count2}`)
    }
    const onIncrement = _ => {
        setCount1(count1() + 1);
        setCount2(count2 + 1);

        getCount1();
        getCount2();
    }

    return <div>
        <h2>Part B</h2>
        <b>User</b>: <span>{JSON.stringify(user)}</span>
        <div>Count: {count1()}</div>
        <button onClick={onIncrement}>Increment</button>
    </div>
}

export default PartB;