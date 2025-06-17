import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios'
import { createQuery } from './util/functions'
// import App from './App.jsx'

const App = () => {
  useEffect(() => {
    const args = { name: 'ali', nums: [10, 12, 15, 9], location: { city: { name: 'tehran', code: '123' }, zip: '123456' } }
    console.log(createQuery(args))
    axios.get('/api/users', { params: args })
  }, [])

  return <>hi</>
}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <App />
  // </StrictMode>,
)
