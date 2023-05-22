// 사용할 파일에서 import { fetchGradient } from 'styles/gradient.js' 로 불러와서 사용
// fetchGradient(weather) 로 사용하면 해당 날씨에 맞는 gradient를 반환
// weather은 WeatherAPI.jsx파일의 currentWeather.weather

// Thunderstorm, Dust, Sand, Ash, Tornado 

// Clear, Clouds, Rain, Snow, Fog
// Rain -> Drizzle, Squall
// Fog -> Mist, Smoke, Hase
const gradients = {
  Clear: "linear-gradient(to bottom, #A1C4FD, #C2E9FB)",
  Cloud: "linear-gradient(to bottom, #89BCE0, #B7B7B7)",

  Fog: "linear-gradient(to bottom, #A8CAC8, #FF5733)",
  Mist: "linear-gradient(to bottom, #A8CAC8, #FF5733)",
  Smoke: "linear-gradient(to bottom, #A8CAC8, #FF5733)",
  Haze: "linear-gradient(to bottom, #A8CAC8, #FF5733)",


  Rain: "linear-gradient(to bottom, #2B5876, #4E4376)",
  Drizzle: "linear-gradient(to bottom, #2B5876, #4E4376)",
  Squall: "linear-gradient(to bottom, #2B5876, #4E4376)",

  Snow: "linear-gradient(to bottom, #DAD4EC, #F3E7E9)"
};

export function fetchGradient(weather) {
  return gradients[weather];
}