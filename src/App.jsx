import { appContext } from "./appContext";
import PartA from './PartA'
import PartB from './PartB'
import PartC from './PartC'
import PartD from './PartD'
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
