import styled from "styled-components";
import '../styles/index.css';
import '../styles/TuneCastPage.css';
import jimin from '../assets/images/jimin_mimoji.png';
import circleBackground from '../assets/images/circle_background.png';
import chart_icon from '../assets/images/chart_icon.png';
import spotify_icon from '../assets/images/spotify_icon.png';
import weather_icon from '../assets/images/weather_icon.png';
import notion from '../assets/images/notion.png';
import github from '../assets/images/github.png';

function MemberPage() {

  const members = [
    {
      name: "김유리",
      major: "건축공학전공",
      id: "2020112423",
      github: "yurik1m",
      image: null,
    },
    {
      name: "김영철",
      major: "경영학과",
      id: "2019111418",
      github: "kyc7604",
      image: null,
    },
    {
      name: "전지민",
      major: "산업시스템공학과",
      id: "2019113625",
      github: "JMM00",
      image: jimin,
    },
  ];

  return (
    <Container>
      <BlockBackground>
        <CircleBackground>
          <ChartIcon src={chart_icon} />
          <SpotifyIcon src={spotify_icon} />
          <WeatherIcon src={weather_icon} />

          <ImgTitle>Tune Cast</ImgTitle>
          <ImgSubTitle style={{top: 160, left: 80 }}>WeatherAPI</ImgSubTitle>
          <ImgSubTitle style={{top: 160, right: 110 }}>Spotify</ImgSubTitle>
          <ImgSubTitle style={{bottom: 30, left: 230 }}>Chart.js</ImgSubTitle>
        </CircleBackground>
        <SubBlockBackground>
          <Title>{`광역시 기준 날씨 정보를 제공하고 \n날씨에 맞는 플레이리스트를 추천해주는 서비스`}</Title>
          <Header>TuneCast</Header>
          <Body>날씨와 어울리는 플레이리스트</Body>
          <Body>간단하지만 필요한 날씨정보</Body>
          <Body>내가 누른 좋아요 기반 간단한 통계</Body>

          <Caption>자세히 알아보기...</Caption>
          <IconContainer>
            <Icon src={notion}/>
            <Icon src={github}/>
          </IconContainer>
        </SubBlockBackground>
      </BlockBackground>
      <BlockBackground>
        <MemberContainer >
          {members.map((member, index) => (
            <>
              <MemberBlock key={index}>
                <Profile>
                  {member.image && (
                    <img src={member.image} alt={member.name} width="80%" height="80%" />
                  )}
                </Profile>
                <MemberInfo>
                  <Title>이름: {member.name}</Title>
                  <Title>학과: {member.major}</Title>
                  <Title>학번: {member.id}</Title>
                  <Title> <Icon src={github} style={{paddingLeft: 10}}/>: {member.github}</Title>
                </MemberInfo>
              </MemberBlock>

              {index !== members.length - 1 && <hr />}
            </>
          ))}
        </MemberContainer>
      </BlockBackground>
    </Container>
  )
}
export default MemberPage;


const Container = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const BlockBackground = styled.div`
  background: rgba(255, 255, 255, 0.3);
  border-radius: 30px;

  margin: 35px 120px;

  width: 80vw;
  height: 640px;
  display: flex;
  justify-content: center; 
  align-items: center;
`

const MemberContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 0 0 0;
  padding: 0 0 0 0;

  width: 100%;
  height: 100%;
`
const MemberBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const MemberInfo = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  margin: 60px 0 0 0;
`
const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
`

const SubBlockBackground = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin: 0 90px 0 90px; 
`

const IconContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
`

// 이미지 관련 css
const CircleBackground = styled.div`
  background-image: url(${circleBackground});
  background-size: cover;
  width: 552px;
  height: 442.61px;
  position: relative;
  margin: 0 0 0 86px;
`
const ChartIcon = styled.img`
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: 30px;
  left: calc(50% - 70px);
  padding: 20px;
`
const SpotifyIcon = styled.img`
  width: 80px;
  height: 80px;
  position: absolute;
  top: 10px;
  right: 40px;
  // background: red;
  padding: 50px;
`
const WeatherIcon = styled.img`
  width: 120px;
  height: 120px;
  position: absolute;
  top: 10px;
  left: 40px;
  padding: 20px;
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin: 20px 5px 0 0;
  padding: 0 0 0 0;
`

// 텍스트 관련 css
const Title = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  white-space: pre-line;
`
const Header = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;

  margin: 20px 0;
`
const Body = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  padding: 5px 0 5px 0;
`
const Caption = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  margin: 79px 0 13px 0;
`

const ImgTitle = styled.p`
  position: absolute;
  left: calc(50% - 80px);
  top: calc(50% - 30px);

  font-family: 'Jost';
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 58px;
`

const ImgSubTitle = styled.p`
  position: absolute;
  font-family: 'Jost';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
`