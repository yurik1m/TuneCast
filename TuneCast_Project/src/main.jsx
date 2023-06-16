import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import './styles/index.css'
import Playlist from './pages/Playlist.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Playlist />
  </React.StrictMode>,
)
