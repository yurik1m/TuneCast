// 사용할 파일에서 import { gradients } from './gradients'; 로 불러와서 사용
//

// Thunderstorm, Drizzle, Mist, Smoke, Haze, Dust, Fog, Sand, Ash, Squall, Tornado 
// Clear, Clouds, Rain, Snow, Fog
const gradients = {
  Clear: "linear-gradient(to bottom, #A1C4FD, #C2E9FB)",
  Cloud: "linear-gradient(to bottom, #89BCE0, #B7B7B7)",
  Fog: "linear-gradient(to bottom, #A8CAC8, #FF5733)",
  Rain: "linear-gradient(to bottom, #2B5876, #4E4376)",
  Snow: "linear-gradient(to bottom, #DAD4EC, #F3E7E9)"
};

export function fetchGradient(weather) {
  return gradients[weather];
}