import styled from "styled-components";
import '../styles/index.css';
import '../styles/TuneCastPage.css';
import jimin from '../assets/images/jimin_mimoji.png';
import yuri from '../assets/images/yuri.png';
import yc from '../assets/images/yc.png';
import chart_icon from '../assets/images/chart_icon.png';
import spotify_icon from '../assets/images/spotify.png';
import weather_icon from '../assets/images/weather_icon.png';
import notion from '../assets/images/notion.png';
import github from '../assets/images/github.png';

import { useState } from "react";

import { Header, Footer } from "../components"
import { Icon } from "semantic-ui-react";
import { Main } from "../styles/StyledHome";

function MemberPage() {

  const [isHovered, setIsHovered] = useState([false, false, false]);
  const [isShowToolTip, setIsShowToolTip] = useState(false);

  const members = [
    {
      name: "김유리",
      major: "건축공학전공",
      id: "2020112423",
      github: "yurik1m",
      githubURL: "https://github.com/yurik1m",
      image: yuri,
    },
    {
      name: "김영철",
      major: "경영학과",
      id: "2019111418",
      github: "kyc7604",
      githubURL: "https://github.com/kyc7604",
      image: yc,
    },
    {
      name: "전지민",
      major: "산업시스템공학과",
      id: "2019113625",
      github: "JMM00",
      githubURL: "https://github.com/JMM00",
      image: jimin,
    },
  ];

  return (<>
    <Header />
    <Background>
      <MainBlock>
        <IconContainer>
          <IconStackLeft onClick={() => handleClick('https://openweathermap.org/')} onMouseEnter={() => setIsHovered([true, false, false])} onMouseLeave={() => setIsHovered([false, false, false])}>
            <Image className="blink" src={weather_icon} alt="weatherAPI" isHovered={isHovered[0]}></Image>
            <ImageTitle>weatherAPI</ImageTitle>
          </IconStackLeft>
          <IconStackRight onClick={() => handleClick('https://open.spotify.com/')} onMouseEnter={() => setIsHovered([false, true, false])} onMouseLeave={() => setIsHovered([false, false, false])}>
            <Image className="blink small" src={spotify_icon} alt="spotify" isHovered={isHovered[1]}></Image>
            <ImageTitle>spotify</ImageTitle>
          </IconStackRight>
          <IconStackBottom onClick={() => handleClick('https://www.chartjs.org/')} onMouseEnter={() => setIsHovered([false, false, true])} onMouseLeave={() => setIsHovered([false, false, false])}>
            <Image className="blink medium" src={chart_icon} alt="chart.js" isHovered={isHovered[2]}></Image>
            <ImageTitle>Chart.js</ImageTitle>
          </IconStackBottom>
          <Title className="primary">TuneCast</Title>
        </IconContainer>
        <Vline />
        <TextVStack>
          <Title>{`광역시 기준 날씨 정보를 제공하고 \n날씨에 맞는 플레이리스트를 추천해주는 서비스`}</Title>
          <HeaderFont>TuneCast</HeaderFont>
          <Body className={isHovered[0] ? "primary" : ""}>간단하지만 필요한 날씨정보</Body>
          <Body className={isHovered[1] ? "primary" : ""}>날씨와 어울리는 플레이리스트</Body>
          <Body className={isHovered[2] ? "primary" : ""}>내가 누른 좋아요 기반 간단한 통계</Body>

          <Caption>자세히 알아보기...</Caption>
          <Tooltip>
            <Image 
            className="icon2" 
            src={github} 
            onClick={() => handleClick('https://github.com/yurik1m/TuneCast')} 
            onMouseEnter={() => setIsShowToolTip(true)}
            onMouseLeave={() => setIsShowToolTip(false)}/>
            <TooltipText style={{ visibility: isShowToolTip ? 'visible' : 'hidden' }}> TuneCast 깃허브로 이동하기</TooltipText>
          </Tooltip>
        </TextVStack>
      </MainBlock>
      <MainBlock>
        {members.map((member, index) => (
          <div key={index}>
            <ProfileVStack>
              <ProfileImage src={member.image} alt={member.name} />
              <ProfileTextVStack>
                <ProfileTitle>이름: {member.name}</ProfileTitle>
                <ProfileTitle>학과: {member.major}</ProfileTitle>
                <ProfileTitle>학번: {member.id}</ProfileTitle>
                <ProfileTitle> <Image className="icon" src={github} style={{ paddingLeft: 10 }} />: <a href={member.githubURL} target="_blank">{member.github}</a></ProfileTitle>
              </ProfileTextVStack>
            </ProfileVStack>
            {index !== members.length - 1 && <hr />}
          </div>
        ))}
      </MainBlock>
    </Background>
    <Footer />
  </>
  )
}
export default MemberPage;

const handleClick = (url) => {
  window.open(url, '_blank');
}


const Background = styled.div`
  width: 100vw;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  padding: 120px 0 35px 0;
`

const MainBlock = styled.div`
  width: 1200px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 30px;

  margin: 35px 0 0 0 ;
  padding: 50px 20px;
`
const VStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const TextVStack = styled(VStack)`
  padding: 0 30px 0 0;
  margin: 0 20px 0 0;
`
const ProfileTextVStack = styled(VStack)`
  align-items: left;
`
const ProfileVStack = styled(TextVStack)`
  width: 320px;
  align-items: center;
  padding: 20px 20px;
`

const IconStack = styled(VStack)`
  align-items: center;
  width: 250px;
  height: 250px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`
const IconStackLeft = styled(IconStack)`
  position: absolute;

  padding: 20px;
  left: 5%;
  top: 10%;
`
const IconStackRight = styled(IconStack)`
  position: absolute;
  right: 5%;
  top: 10%;
`
const IconStackBottom = styled(IconStack)`
  position: absolute;
  left: 25%;
  bottom: 5%;
`


const Image = styled.img`
  width: 50%;
  height: 50%;
  margin: 0 20px;

  &.blink {
    animation: ${props => props.isHovered ? 'blink 2s infinite' : 'none'};

    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0.2; }
      100% { opacity: 1; }
    }
  }

  &.small {
    padding: 30px;
  }

  &.medium {
    padding: 15px;
  }

  &.icon {
    height: 20px;
    width: 30px;
    margin: 0 0 0 5px;
  }

  &.icon2 {
    width: 20px;
    margin: 0px;

    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  }
`
const ProfileImage = styled(Image)`
  width: 220px;
  height: 220px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%; 

  margin: 0 0 30px 0;
`
const IconContainer = styled.div`
  width: 500px;
  height: 500px;

  position: relative;

  padding: 20px;
`

const Vline = styled.p`
    border-left: 2px solid rgba(255, 255, 255, 0.5);
    height: 70%;
`

const Font = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
`
const Title = styled(Font)`
  display: inline-block;
  font-size: 20px;
  line-height: 24px;
  white-space: pre-line;
  
  &.primary {
    font-size: 30px;
    top: 50%;
    position: relative;
    justify-self: start;
    background: linear-gradient(
      to top,
      rgba(243, 114, 44, 0.5) 50%,
      transparent 50%
    );
  }
`
const ImageTitle = styled(Font)`
  font-size: 15px;
  line-height: auto;
  white-space: pre-line;
`
const ProfileTitle = styled(Title)`
  padding: 0 40px;
`
const HeaderFont = styled(Font)`
  font-size: 40px;
  line-height: 48px;

  margin: 20px 0;
`
const Body = styled(Font)`
  display: inline-block;
  font-size: 15px;
  line-height: 15px;
  padding: 5px 0 5px 0;
  align-self: flex-start;

  &.primary {
    background: linear-gradient(
      to top,
      rgba(255, 255, 0, 0.5) 50%,
      transparent 50%
    );
    transition: top 0.2s;
  }
`
const Caption = styled(Font)`
  font-size: 10px;
  line-height: 12px;

  margin: 79px 0 13px 0;
`

const Tooltip = styled. p`
  position: relative;
  display: flex;
  place-content: left;
`
const TooltipText = styled.span`
  visibility: hidden;
  width: 220px;
  background-color: rgba(255, 255, 255, 0.5);
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
  padding: 10px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: -10px;
  left: 25%;
  margin-left: -60px;

  &::after {
    content: "";
    position: absolute;
    top: 15px;
    left: -4px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent rgba(255, 255, 255, 0.5) transparent transparent;
  }
`