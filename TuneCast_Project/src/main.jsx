import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import './styles/index.css'
import Background from './components/background'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Background>
      <App />
    </Background>
  </React.StrictMode>,
)
