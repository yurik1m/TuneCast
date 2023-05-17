import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import TuneCastPage from './pages/TuneCastPage.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <TuneCastPage />
  </React.StrictMode>,
)
