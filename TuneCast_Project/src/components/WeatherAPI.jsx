import { useEffect, useState } from "react";
import { fetchForecast, fetchCurrentWeather, convertUnixToKST, convertCityName } from "../utils/WeatherAPIFunctions.js";

//city: Seoul, Busan, Daegu, Incheon, Gwangju, Daejeon, Ulsan, Sejong

// 5일 예보의 경우 아래와 같이 불러서 사용
// 최고온도: forecast[index].temp_max
// 최저온도: forecast[index].temp_min
// 날씨: forecast[index].weather

// 위치(도시): currentWeather.cityName
// 시간: currentWeather.dt -> ex) 5월 23일 화요일 12:00
// currentWeather.current_temp
// currentWeather.temp_max
// currentWeather.temp_min
// currentWeather.feels_like
// currentWeather.weather

function WeatherAPI() {
  const [forecast, setForecast] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("Seoul");

  useEffect(() => {
    if (isLoading) {
      fetchForecast(city).then((data) => {
        const filteredData = data.list.filter((item, index) => index % 8 === 0);
        const forecastData = filteredData.map((item) => ({
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
          weather: item.weather[0].main
        }));
        console.log(forecastData);
        setForecast(forecastData);
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      fetchCurrentWeather(city).then((data) => {
        const currentData = {
          cityName: convertCityName(city),
          dt: convertUnixToKST(data.dt),
          current_temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          feels_like: data.main.feels_like,
          weather: data.weather[0].main
        };
        console.log(currentData);
        setCurrentWeather(currentData);
      });
    }
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
  }, [city]);

  return <div>
    <button onClick={() => setIsLoading((loading) => true)}>
      데이터 로딩하기
    </button>

    <CityButtonComponent setCity={setCity} />
  </div>;
}

export default WeatherAPI;

function CityButtonComponent({ setCity }) {
  const cityName = [
    { name: "서울", nameEng: "Seoul" },
    { name: "부산", nameEng: "Busan" },
    { name: "대전", nameEng: "Daejeon" },
    { name: "대구", nameEng: "Daegu" },
    { name: "인천", nameEng: "Incheon" },
    { name: "광주", nameEng: "Gwangju" },
    { name: "울산", nameEng: "Ulsan" },
    { name: "세종", nameEng: "Sejong" }
  ]
  const handleCityButton = (newCity) => {
    console.log(newCity);
    setCity(newCity);
  };

  return (
    <div>
      {cityName.map((city, idx) => (
        <button key={idx} onClick={() => handleCityButton(city.nameEng)}> {city.name} </button>
      ))}
    </div>
  );
}


