import '../styles/Playlist.css';
import fillHeart from '../assets/images/fill_heart.png';
import playicon from '/etc/play_icon.png'
import spotify from '../assets/images/spotify.png';
import ListBackground from '../assets/images/listbackground.png';
import { styled, keyframes} from 'styled-components';
import {Header, Footer} from '../components';
import Heart from "react-animated-heart";
import { useEffect, useState, Fragment, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { getPlaylistTracks } from '../utils/spotifyAPI';


 function TrackBlock ({track, index, setCount}) {
  const [isClick, setIsClick] = useState(false);
   return (
    <TrackContainer>
      <TrackNumber>{index}</TrackNumber>
      <TrackCover src={track.cover}/>
      <TrackMainBlock>
        <TrackTitle>{track.name}</TrackTitle>
        <TrackArtist>{track.artist}</TrackArtist>
      </TrackMainBlock>
      <TrackAlbum>{track.album}</TrackAlbum>
      <Heart isClick={isClick} onClick={() =>{
            setIsClick(!isClick);
            if(isClick){
              setCount(prevCount => [prevCount[0] - 1, prevCount[1]]);
            } else {
              setCount(prevCount => [prevCount[0] + 1, prevCount[1]]);
            };
      }}
      />
    </TrackContainer>
   )
 }

 const PlaylistCover = ({playlist, setCount}) => {
  const [isClick, setIsClick] = useState(false);
  const cover = playlist.cover;
  return (
    <MainContainer cover={cover}>
      <Transparent/>
      <Title >{playlist.name}</Title>
      <SubContainer>
        <Icon>
          <ImgSubTitle >Spotify</ImgSubTitle> 
          <Img src={spotify}/>
          <Heart isClick={isClick} onClick={() =>{
            setIsClick(!isClick);
            if(isClick){
              setCount(prevCount => [prevCount[0], prevCount[1]-1]);
            } else {
              setCount(prevCount => [prevCount[0], prevCount[1]+1]);
            };
      }} />
        </Icon>
        <PlayIcon src={playicon}/>
      </SubContainer>
  </MainContainer>
  )
 }

function Playlist() {
  //값 받아오기
  const location = useLocation();
  const playlist = location.state.data;
  let weather = location.state.weather;

  const [track,setTrack] = useState([]); //플레이리스트 트랙
  const [count, setCount] = useState([0,0]); //선호도
  
  const tuneCast_data = JSON.parse(localStorage.getItem("TuneCast"));
  console.log(tuneCast_data);
  const isMounted = useRef(false);

  //count를 로컬스토리지 값으로 초기화
  useEffect(() => {
    if(weather === "Clear") {
      setCount([tuneCast_data.song.맑음, tuneCast_data.playlist.맑음]);
    }else if(weather === "Clouds") {
      setCount([tuneCast_data.song.흐림, tuneCast_data.playlist.흐림]);
    }else if(weather === "Rain") {
      setCount([tuneCast_data.song.비, tuneCast_data.playlist.비]);
    }else if(weather === "Snow") {
      setCount([tuneCast_data.song.눈, tuneCast_data.playlist.눈]);
    }else if(weather === "Fog") {
      setCount([tuneCast_data.song.안개, tuneCast_data.playlist.안개]);
    }else {
      setCount([tuneCast_data.song.기타, tuneCast_data.playlist.기타]);
    };
  }, []);

  //count가 바뀔때마다 로컬스토리지 값도 바꿔줌
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if(weather === "Clear") {
      tuneCast_data.song.맑음 = count[0];
      tuneCast_data.playlist.맑음 = count[1];
    }else if(weather === "Clouds") {
      tuneCast_data.song.흐림 = count[0];
      tuneCast_data.playlist.흐림 = count[1];
    }else if(weather === "Rain") {
      tuneCast_data.song.비 = count[0];
      tuneCast_data.playlist.비 = count[1];
    }else if(weather === "Snow") {
      tuneCast_data.song.눈 = count[0];
      tuneCast_data.playlist.눈 = count[1];
    }else if(weather === "Fog") {
      tuneCast_data.song.안개 = count[0];
      tuneCast_data.playlist.안개 = count[1];
    }else {
      tuneCast_data.song.기타 = count[0];
      tuneCast_data.playlist.기타 = count[1];
    };
    localStorage.setItem("TuneCast", JSON.stringify(tuneCast_data));
  }, [count]);

  // // 플레이리스트 받기
  useEffect(() => {
    getPlaylistTracks(playlist.id)
    .then((data) => {
      setTrack(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <Fragment>
    <Header />
    <Container>
     <PlaylistCover playlist={playlist} weather={weather} count={count} setCount={setCount}/>
      <Hline > </Hline>
      <MusicList >
        <SubContainer>
          <TrackNumber >#</TrackNumber>
          <UpperMusiclist >제목</UpperMusiclist>
          <TrackAlbum >앨범</TrackAlbum> 
          <TrackArtist>좋아요</TrackArtist> 
        </SubContainer>
        <Hline />
        <ul>
          {track.map((track, index) => (
            <TrackBlock key={index} track={track} index={index+1} count={count} setCount={setCount}/>
          ))}
        </ul>
      </MusicList>
    </Container> 
    <Footer />
    </Fragment>
  )
}
export default Playlist;

const slideAnimation = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
  `;


const Container = styled.div`
  width: 1200px;
  margin: 120px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const MainContainer = styled.div`
  height: 450px;
  width: 1200px;
  position: relative;
  display: flex;
  margin: 60px 120px;
  justify-content: flex-end;
  align-items: start;
  flex-direction: column;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 60px;

  ${(props) =>
    props.cover
      ? `background-image: url(${props.cover});`
      : ''};
`

const Transparent = styled.div`
  position: absolute;
  height: 450px;
  width: 1200px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  top: 0;
  left: 0;
`

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
  margin-bottom: 15px;
  padding: 0 20px;
`

const Icon = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 5;
`

const MusicList = styled.div `
  width: 1200px;
  flex-direction: column;
  align-items: center;
  justify-content : center;
  border-radius: 30px;
  margin-top: 60px;
  padding: 45px;
  background-color: rgba(255, 255, 255, 0.3);
`
const Title = styled.p `
  font-weight: bold;
  font-size: 80px;
  margin-bottom: 15px;
  width: 800px; /* 적절한 너비 값 설정 */
  white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
  overflow: hidden; /* 너비를 초과하는 텍스트 감추기 */
  text-overflow: ellipsis; /* 생략 부분을 ...으로 표시 */
  z-index: 5;
  &:hover {
      animation: ${slideAnimation} 10s linear infinite;
    }
`

const ImgSubTitle = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 27px;
  margin-right: 70px;
`
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 70px;
`

const PlayIcon = styled.img` 
  width: 100px;
  height: 100px;
`
const UpperMusiclist = styled.p`
  font-size: 24px;
  width: 480px;
`

const Hline = styled.div`
  width: 100%;
  border-bottom: 1px solid #FFFFFF;
  margin-bottom: 15px;
`

const TrackContainer = styled.div`
  width: 100%;
  height: 70px; 
  display: flex;
  align-items: center;
  margin:0 0 20px 0;
`

const TrackNumber = styled.p`
  margin-right: 50px;
`

const TrackCover = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 22px;
  `

  const TrackMainBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 395px;
    height: 63px;
    justify-content: space-between;
    align-items: start;
    margin-right: 22px;
  `

  const TrackTitle = styled.p`
    font-weight: bold;
    font-size: 25px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    max-width: 395px;
    will-change: transform;
    &:hover {
      animation: ${slideAnimation} 10s linear infinite;
      overflow: visible;
    }
  `

  const TrackArtist = styled.p`
    font-size: 20px;
  `

  const TrackAlbum = styled.p`
    width: 445px;
    font-size: 20px;
    margin-right: 10px;
  `