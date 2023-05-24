const API_KEY = import.meta.env.VITE_WEATHER_KEY;

function fetchForecast(city) {
  let API_URL_Forecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city},kr&appid=${API_KEY}&units=metric`;
  return fetch(API_URL_Forecast).then((res) => res.json());
}

function fetchCurrentWeather(city) {
  let API_URL_CurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city},kr&appid=${API_KEY}&units=metric`;
  return fetch(API_URL_CurrentWeather).then((res) => res.json());
}

function convertUnixToKST(unixTime) {
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

function convertCityName(city) {
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

// 현재 날씨의 경우 아래와 같이 불러서 사용
// fetchCurrentWeatherData('도시이름').then((data) => console.log(data));
// data -> [{cityName: '도시이름', dt: '날짜', current_temp: '현재온도', temp_max: '최고온도', temp_min: '최저온도', feels_like: '체감온도', weather: '날씨'}, .. ]
export async function fetchCurrentWeatherData(city) {
  const fetchData = await fetchCurrentWeather(city);
  const currentData = {
    cityName: convertCityName(city),
    dt: convertUnixToKST(fetchData.dt),
    current_temp: fetchData.main.temp,
    temp_max: fetchData.main.temp_max,
    temp_min: fetchData.main.temp_min,
    feels_like: fetchData.main.feels_like,
    weather: fetchData.weather[0].main,
  };
  return currentData;
}

// 5일 예보의 경우 아래와 같이 불러서 사용
// fetchForecastData('도시이름').then((data) => console.log(data));
// data -> [ {temp_max: '최고온도', temp_min: '최저온도', weather: '날씨'}, .. ]
export async function fetchForecastData(city) {
  const fetchData = await fetchForecast(city);
  //TODO: 추후 현재날짜와 시간을 고려하여 필요한 데이터만 추출하도록 변경필요 (시작 데이터가 현재시간이 아님)
  const filteredData = fetchData.list.filter((item, index) => index % 8 === 0);
  const forecastData = filteredData.map((item) => ({
    temp_max: item.main.temp_max,
    temp_min: item.main.temp_min,
    weather: item.weather[0].main,
  }));
  return forecastData;
}