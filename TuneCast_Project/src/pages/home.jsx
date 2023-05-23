import styled from "styled-components";
import { useEffect, useState,Fragment } from "react";
import {Header, Footer} from "../components"
import mapicon from "../assets/images/mapping_icon.png"
import {searchPlaylistsByTag} from "../api/playlist"
import cloud from "../assets/images/cloud.png"
import rain from "../assets/images/rain.png"
import wsnow from "../assets/images/snow.png"
import sun from "../assets/images/sun.png"
import fog from "../assets/images/fog.png"
import playicon from "../assets/images/play_icon.png"


function PlaylistContainer ({playlist}) {
  return (
    <PlayContainer>
      <PlayCover src={playlist.cover} alt="플레이리스트 커버"/>
      <PlayDetail>
        <h3>{playlist.title}</h3>
        <p>spotify</p>
        <button>
          <img src={playicon} alt="play"/>
        </button>
      </PlayDetail>
   </PlayContainer>
)
};


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("서울");
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [isPlaylist, setIsPlaylist] = useState([]);
  const sites = [{name: "서울", //지역, 위도, 경도
                  lat: "37.532600",
                  lon: "127.024612",},
                  {name: "부산",
                  lat: "35.179554",
                  lon: "129.075642",},
                  {name: "대전",
                  lat: "36.350412",
                  lon: "127.384548",},
                  {name: "대구",
                  lat: "35.871380",
                  lon: "128.601743",},
                  {name: "인천",
                  lat: "37.456256",
                  lon: "126.705206",},
                  {name: "광주",
                  lat: "35.160072",
                  lon: "126.851440",},
                  {name: "울산",
                  lat: "35.538377",
                  lon: "129.311360",},
                  {name: "세종",
                  lat: "36.480132",
                  lon: "127.289021",},
                ];
  const weathers = [{name: "맑음",src: {sun}},    //날씨 + 아이콘 배열
                    {name: "구름",src: {cloud}},
                    {name: "비",src: {rain}},
                    {name: "눈",src: {wsnow}},
                    {name: "안개",src: {fog}}];

  const weatherTag = weathers[0].name; //날씨 태그

  useEffect(() => {  //날씨 태그에 따른 플레이리스트 검색
    searchPlaylistsByTag(weatherTag, 4)
      .then((playlists) => {
        setIsPlaylist(playlists);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isPlaylist]);

  const handleSelect = (site) => {
      if(selectedItem != site){
        setSelectedItem(site);
      }
    };
    useEffect(() => {},[]);
  
  return (
    <Fragment>
    <Header isMainPage={true} onMenuClick={() => setIsMenuOpen(!isMenuOpen)}/>
    {isMenuOpen && (
      <MenuWrapper isOpen={isMenuOpen}>      
        <Menu>
        <div>
          <img src={mapicon} alt="지역선택"/>
          위치 선택하기
        </div>
        <ul>
        {sites.map((site, idx) => (
          <SiteList 
            key={idx}
            onClick={() => handleSelect(site)}
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
        <MainSection>
         { isPlaylist.map((playlist) => (
            <PlaylistContainer 
              key={playlist.id}
              playlist={playlist}
            />
          ))}
        </MainSection>
    </Main>
    
    <Footer />
    
    </Fragment>
  )

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

const Menu = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  bottom: 0;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #E0F3FE;
`

const SiteList = styled.li`
  width: 140px;
  height: 55px;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  margin-bottom: 30px;
  &:hover {
    border-color: white;
  }
  &.selected {
    border-color: white;
  }
`
const Main = styled.main`
  width: 1200px;
  height: 1200px;
  margin: center;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const MainSection = styled.div`
  width: 100%;
  height: 640px;
  border-radius: 10%;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const PlayContainer = styled.div`
  width: 520px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`
const PlayCover = styled.img`
  width: 205px;
  height: 205px;
`

const PlayDetail = styled.div`
  width: 250px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
`