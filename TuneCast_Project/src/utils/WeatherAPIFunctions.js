const API_KEY = import.meta.env.VITE_WEATHER_KEY;

export function fetchForecast(city) {
  let API_URL_Forecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city},kr&appid=${API_KEY}&units=metric`;
  return fetch(API_URL_Forecast).then((res) => res.json());
}

export function fetchCurrentWeather(city) {
  let API_URL_CurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city},kr&appid=${API_KEY}&units=metric`;
  return fetch(API_URL_CurrentWeather).then((res) => res.json());
}

export function convertUnixToKST(unixTime) {
  var date = new Date(unixTime * 1000);

  var timezoneOffset = date.getTimezoneOffset() * 60000;
  var kst = date.getTime() + timezoneOffset + 32400000;
  date = new Date(kst);

  var month = date.getMonth() + 1;
  var day = date.getDate();
  var dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  var hour = date.getHours();
  var minute = date.getMinutes();

  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;

  return `${month}월 ${day}일 ${dayOfWeek}요일 ${hour}:${minute}`;

}

export function convertCityName(city) {
  const cityList = {
    "Seoul": "서울특별시",
    "Busan": "부산광역시",
    "Daegu": "대구광역시",
    "Incheon": "인천광역시",
    "Gwangju": "광주광역시",
    "Daejeon": "대전광역시",
    "Ulsan": "울산광역시",
    "Sejong": "세종특별자치시"
  };
  return cityList[city];
}