// 사용할 파일에서 import { fetchGradient } from 'styles/gradient.js' 로 불러와서 사용
// fetchGradient(weather) 로 사용하면 해당 날씨에 맞는 gradient를 반환
// weather은 WeatherAPI.jsx파일의 currentWeather.weather

// Thunderstorm, Dust, Sand, Ash, Tornado 

// Clear, Clouds, Rain, Snow, Fog
// Rain -> Drizzle, Squall
// Fog -> Mist, Smoke, Hase
const gradients = {
  Clear: "linear-gradient(to bottom, #A1C4FD, #C2E9FB)",
  Clouds: "linear-gradient(to bottom, #89BCE0, #93B7B5)",

  Fog: "linear-gradient(to bottom, #A8CAC8, #B7B7B7)",
  Mist: "linear-gradient(to bottom, #A8CAC8, #B7B7B7)",
  Smoke: "linear-gradient(to bottom, #A8CAC8, #B7B7B7)",
  Haze: "linear-gradient(to bottom, #A8CAC8, #B7B7B7)",


  Rain: "linear-gradient(to bottom, #2B5876, #4E4376)",
  Drizzle: "linear-gradient(to bottom, #2B5876, #4E4376)",
  Squall: "linear-gradient(to bottom, #2B5876, #4E4376)",

  Snow: "linear-gradient(to bottom, #DAD4EC, #F3E7E9)"
};

export function fetchGradient(weather) {
  return gradients[weather];
}

export function fetchColors() {
  const clear = ["#C2E9FB", "#A1C4FD"];
  const clouds = ["#93B7B5", "#89BCE0"];
  const fog = ["#B7B7B7", "#A8CAC8"];
  const rain = ["#4E4376", "#2B5876"];
  const snow = ["#F3E7E9", "#DAD4EC"];
  const etc= ["#a8edea", "#fed6e3"];

  return [clear, clouds, fog, rain, snow, etc];
}