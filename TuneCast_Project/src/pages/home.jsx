import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useReducer,Fragment } from "react";
import {Header, Footer} from "../components"
import mapicon from "../assets/images/mapping_icon.png"
import {searchPlaylistsByTag} from "../utils/spotifyAPI"
import playicon from "/etc/play_icon.png"
import back from "../assets/images/back_icon.png"
import { fetchCurrentWeatherData, fetchForecastData} from "../utils/WeatherAPIFunctions";
import {sites, weathers} from "../utils/data";
import {Menu, SiteList, Main, PlayContainer, PlayCover, PlayButton, PlayDetail, PlayTitle, ButtonImg, Back, CurrentWeatherInfoContainer, CurrentWeatherContainer, Icon, MainContainer, City, Report, Special, MaxTemp, Temp, MinTemp, CurrentTemp, Text, ForcastContainer, CurrentWeatherIcon,DayContainer, Weather} from "../styles/StyledHome";
import {fetchGradient} from "../styles/Gradient";
import "../styles/spinner.css";


function PlaylistContainer ({playlist, weather}) {
  return (
    <Link to={`playlist/${playlist.name}`} state={{data: playlist, weather: weather}}>
      <PlayContainer>
        <PlayCover src={playlist.cover} alt="플레이리스트 커버"/>
        <PlayDetail>
          <PlayTitle>{playlist.name}</PlayTitle>
          <p>spotify</p>
          <PlayButton>
            <ButtonImg src={playicon} alt="play"/>
          </PlayButton>
        </PlayDetail>
     </PlayContainer>
   </Link>
)};


const special_report = (weather) => { //기상청 기준인데 기준 완화
  if(weather.feels_like >= 33) {
    return "폭염주의보"
  }
  if(weather.temp_min <= 12) {
    return "한파주의보"
  }
  if(weather.wind_speed >= 14) {
    return "강풍주의보"
  }
  if(weather.huminity <= 35) {
    return "건조주의보"
  }
  return ""
}

function CurrntWeather ({currentWeatherInfo}) {
  const WeatherIcon = () => {
    const weather = weathers.find((weather) => weather.name === currentWeatherInfo.weather);
    return <CurrentWeatherIcon src={weather.src} alt={weather.name}/>
  }

  return (
    <CurrentWeatherContainer>
      <WeatherIcon />
      <CurrentWeatherInfoContainer>
        <City>{currentWeatherInfo.cityName}</City>
        <Text>{currentWeatherInfo.dt}</Text>
        <Report>
          <Special>특보</Special>
          {special_report(currentWeatherInfo) !== "" ? <Text>{special_report(currentWeatherInfo)}</Text> : <Text>특보 없음</Text>
          }
        </Report>
        <Temp>
          <CurrentTemp>{currentWeatherInfo.current_temp}℃</CurrentTemp>
          <MinTemp>{currentWeatherInfo.temp_min}º</MinTemp>/
          <MaxTemp> {currentWeatherInfo.temp_max}º</MaxTemp>
        </Temp>
        <Text>체감온도 : {currentWeatherInfo.feels_like}℃</Text>
        <Text>습도 : {currentWeatherInfo.humidity}%</Text>
      </CurrentWeatherInfoContainer>
    </CurrentWeatherContainer>
  )
}

function ForcastWeather ({weather})  {
  const WeatherIcon = () => {
    const weatherInfo = weathers.find((w) => w.name === weather.weather);
    return <Icon src={weatherInfo.src} alt={weatherInfo.name}/>
  };
  return (
    <DayContainer>
      <WeatherIcon />
      <Text>{weather.temp_max}º /{weather.temp_min}º</Text>
    </DayContainer>
  )
}

const initialState = { //초기값
  isMenuOpen: false,
  selectedItem: "Seoul",
  currentWeatherInfo: [],
  forcastWeatherInfo: [],
  playlist: [],
  isPlaylist: false,
  isLoading: true,
}

const reducer = (state, action) => { 
  switch (action.type) {
    case "TOGGLE_MENU":
      return {...state, isMenuOpen: !state.isMenuOpen};
    case "SELECT_ITEM":
      return {...state, selectedItem: action.payload};
    case "SET_CURRENT_WEATHER_INFO":
      return {...state, currentWeatherInfo: action.payload};
    case "SET_FORECAST_WEATHER_INFO":
      return { ...state, forcastWeatherInfo: action.payload};
    case "SET_PLAYLIST":
      return {...state, playlist: action.payload,};
    case "TOGGLE_PLAYLIST":
      return {...state, isPlaylist: !state.isPlaylist};
    default:
      return state;
  }
};


export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialStat = {
    Clear: 0,
    Clouds: 0,
    Rain: 0,
    Snow: 0,
    Fog: 0,
    Etc: 0,
  };

  if (!localStorage.getItem("TuneCast")) {
    localStorage.setItem("TuneCast", JSON.stringify(initialStat));
  };

  const handleToggleMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  const handleSelectItem = (item) => {
    dispatch({ type: "SELECT_ITEM", payload: item.id });
  };


  useEffect(() => {  //날씨 정보 가져오기
    fetchCurrentWeatherData(state.selectedItem)
      .then((data) => {
        dispatch({ type: "SET_CURRENT_WEATHER_INFO", payload: data });
        const setBackGround = fetchGradient(data.weather);
        document.getElementById("root").style.backgroundImage = setBackGround;
      })
      .catch((error) => {
        console.log(error);
      });
  
    fetchForecastData(state.selectedItem)  // 수정된 부분
      .then((data) => {
        dispatch({ type: "SET_FORECAST_WEATHER_INFO", payload: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state.selectedItem]);

  useEffect(() => {  //날씨 태그에 따른 플레이리스트 검색
    searchPlaylistsByTag(state.currentWeatherInfo.weather, 4)
      .then((playlists) => {
        dispatch({ type: "SET_PLAYLIST", payload: playlists });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state.isPlaylist]);
  

  if(state.currentWeatherInfo.length !== 0) {
  return (
    <Fragment>
    <Header isMainPage={true} onMenuClick={handleToggleMenu}/>
    {state.isMenuOpen && (
      <MenuWrapper isOpen={state.isMenuOpen}>      
        <Menu>
        <div>
          <img src={mapicon} alt="지역선택"/>
          위치 선택하기
        </div>
        <ul>
        {sites.map((site, idx) => (
          <SiteList 
            key={idx}
            onClick={() => handleSelectItem(site)}
          >
            {site.name}
          </SiteList>
        ))}
        </ul>
      </Menu>
    </MenuWrapper>

    )}
    <Main>
        {/* <AudioPlayer src={alarm} /> */}
        <MainContainer>
          <Back onClick={() => dispatch({type: "TOGGLE_PLAYLIST"})}>
            <ButtonImg src={back} alt="플레이리스트/날씨 보기"/>
          </Back>
          {state.isPlaylist ? (
            state.playlist.map((playlist) => (
              <PlaylistContainer 
                key={playlist.id}
                playlist={playlist}
                weather={state.currentWeatherInfo.weather}
              />
            ))
            ) : (
            <Weather>
              <CurrntWeather currentWeatherInfo={state.currentWeatherInfo}/>
              <ForcastContainer>
                {state.forcastWeatherInfo.map((weather, idx) => (
                  <ForcastWeather
                    key={idx}
                    weather={weather}
                />))} 
             </ForcastContainer>
            </Weather>
            )} 
        </MainContainer>
    </Main>
    
    <Footer />
    
    </Fragment>
  )
} else {
  return (
    <div className="loadingio-spinner-rolling-ow5spfue44k"><div className="ldio-osnzl6m5ejj">
    <div></div>
    </div></div>
   
  )
}
}

const MenuWrapper = styled.div`
  position: ${({ isOpen }) => (isOpen ? "fixed" : "static")};
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ isOpen }) => (isOpen ? "100%" : "auto")};
  overflow: ${({ isOpen }) => (isOpen ? "auto" : "visible")};
  z-index: 1;
`;