import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

class App {
    constructor(config) {
        this.config = config;
    }
    run() {
        const root = this.config.root;
        const rootElement = document.getElementById(root)
        createRoot(rootElement).render(
            this.config.noStrictMode ? <App /> :
                <StrictMode>
                    <App />
                </StrictMode>,
        )
    }
}

export default App;