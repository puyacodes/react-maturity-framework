import { appContext } from "./contexts";
import PartA from './components/PartA'
import PartB from './components/PartB'
import PartC from './components/PartC'
import PartD from './components/PartD'
import './App.css'

const { Lang, Theme, User } = appContext.providers;

const Content = () => <div className="flex-container">
  <PartA />
  <PartB />
  <PartC />
  <PartD />
</div>

const App1 = appContext.createApp(<Content />);

const App = () => (
  <Lang>
    <Theme>
      <User>
        <Content />
      </User>
    </Theme>
  </Lang>
)


export default App
