import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import Weather from './pages/weather.jsx'
import TuneCastPage from './pages/TuneCastPage.jsx'
import Playlist from './pages/Playlist.jsx'
import Chart from './pages/Chart.jsx'
import './styles/index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Playlist />
  </React.StrictMode>,
)
