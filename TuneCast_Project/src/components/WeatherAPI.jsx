import { useEffect, useState } from "react";

//city: Seoul, Busan, Daegu, Incheon, Gwangju, Daejeon, Ulsan, Sejong

let API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function WeatherAPI() {
  const [forecast, setForecast] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("Seoul");

  let API_URL_Forecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city},kr&appid=${API_KEY}&units=metric`;
  let API_URL_CurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city},kr&appid=${API_KEY}&units=metric`

  useEffect(() => {
    if (isLoading) {
      fetch(API_URL_Forecast).then(
        function (res) {
          return res.json().then(function (res3) {
            console.log(res3.list);
            setForecast(res3.list);
            setIsLoading(false);
          });
        }
      )
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      fetch(API_URL_CurrentWeather).then(
        function (res) {
          return res.json().then(function (res2) {
            console.log(res2);
            setCurrentWeather(res2);
          });
        }
      )
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


