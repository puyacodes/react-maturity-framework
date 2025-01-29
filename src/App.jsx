import { appContext } from "./contexts";
import PartA from './components/PartA'
import PartB from './components/PartB'
import PartC from './components/PartC'
import PartD from './components/PartD'
import './App.css'
import { useState } from "react";

const { Lang, Theme, User } = appContext.providers;

const Content = () => {
  const [c, setC] = useState(true);

  return <div className="flex-container">
    Toggle C <input type="checkbox" onChange={_ => setC(!c)} checked={c} />
    <PartA />
    <PartB />
    {c && <PartC />}
    <PartD />
  </div>
}

const App = appContext.createApp(<Content />);

const App1 = () => (
  <Lang>
    <Theme>
      <User>
        <Content />
      </User>
    </Theme>
  </Lang>
)


export default App
