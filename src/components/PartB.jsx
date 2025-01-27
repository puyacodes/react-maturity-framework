import { useUser } from "../contexts";

const PartB = () => {
    const [user] = useUser();

    console.log('PartB', { user })

    return <div>
        <h2>Part B</h2>
        <b>User</b>: <span>{JSON.stringify(user)}</span>
    </div>
}

export default PartB;