import '../styles/App.css';
import '../styles/index.css';
import image3 from '../images/image 3.png';
import styled from 'styled-components';
import '../styles/TuneCastPage.css';
import heart from 'Vector.png';
import playicon from 'play.circle.fill 1.png'
import spotify from '../images/spotify_icon.png';
import {Divider} from "semantic-ui-css";
import {Header, Footer, AudioPlayer} from "../components";
import { Button } from 'semantic-ui-react';


function Playlist() {
  const music = [
    {
      Song: "All I Wanna Do",
      Singer: "Sheryl Crow", 
      Album: "Tuesday Night Music Club",
      Image: image3,
    }
  ];
    
  return (
    <Container>
      <MainContainer>
        <Title>Sunny Mix</Title>
        <Main>플레이리스트에 대한 설명이 들어갑니다.</Main>
        <ImgSubTitle style={{top:601, left:183}}>Spotify</ImgSubTitle> 
        <Spotify style={{top: 601, left: 338}} src={spotify}/>
        <ImgSubTitle style={{top: 604, left: 381}}>147</ImgSubTitle> 
        <Heart style={{top: 602, left: 486}} src={heart}/>
        <PlayIcon style={{top: 531, left: 1141}} src={playicon}/>
      </MainContainer>
      <Divider>
      </Divider> 
      <MusicList>
        <UpperMusiclist style={{top: 32, left: 45}}>#</UpperMusiclist>
        <UpperMusiclist style={{top: 32, left: 105}}>제목</UpperMusiclist>
        <UpperMusiclist style={{top: 32, left: 615}}>앨범</UpperMusiclist> 
        <UpperMusiclist style={{top: 32, left: 1099}}>좋아요</UpperMusiclist> 
        <Divider></Divider>
        <Music>
          {music.map((music, index) => (
            <>
            <MusicBlock key={index}> 
              <SongInfo style={{left: 0}}>1</SongInfo>
              {music.Image && (
                <img src={music.Image} width ="70px" height="70px"/>
              )}
              <NameInfo>
                <SongName>All I Wanna Do</SongName>
                <SongInfo>Sheryl Crow</SongInfo>
              </NameInfo>
              <SongInfo style={{left: 615}}>Tuesday Night Music Club</SongInfo>
              <Heart style={{left: 1112}}></Heart>
            </MusicBlock>
            {index !== 20}
            </>
          ))}
        </Music>
      </MusicList>
    </Container> 
  )
}
export default Playlist;

const Container = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const MainContainer = styled.div`
  height: 450px;
  width: 1200px;
  display: flex;
  justify-content: flex-start;
  align-items: end;
  flex-direction: column;
  border-radius: 10%;
  background: url('../images/image 1.png'); 
  background-color: rgba(, , , 0.2);
`
const MusicList = styled.div `
  height: 1441px;
  width: 450px;
  display: flex; 
  justify-content: center; 
  flex-direction: column;
  border-radius: 10%;
  background-color: rgba(255, 255, 255, 0.3);
`
const Title = styled.p `
  font-family: 'Inter';
  font-style: normal;
  font-weight; bold;
  font-size: 100px;
  line-height: 30px;
`
const Main = styled.p `
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  padding: 5px 0 5px 0; 
`
const ImgSubTitle = styled.p`
  position: absolute;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 27px;
  line-height: 22px;
`
const Spotify = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  padding: 10px;
`
const Heart = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  padding: 10px;
`
const PlayIcon = styled.img` 
  width: 100px;
  height: 100px;
  position:absolute;
  padding: 30px;
`
const UpperMusiclist = styled.p`
  position: absolute;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 18px;
  padding: 5px 0 5px 0;
`
const Music = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  width: 100%;
  height: 100%;
`
const MusicBlock = styled.div`
  display: flex;
  flex-direction: row;
`
const SongInfo = styled.p `
  position: absolute;
  font-family: 'Inter';
  font-size: 24px;
  font-style: normal;
  font-weight: 400; 
  line-height: 22px;
`
const SongName = styled.p`
  position: absolute;
  font-family: 'Inter';
  font-size: 30px;
  font-style: normal;
  font-weight: bold; 
  line-height: 22px;
`
const NameInfo = styled.div`
  height: 63px;
  width: 164px;
  display: flex; 
  flex-direction: column;
  justify-contents: flex-start;
`
