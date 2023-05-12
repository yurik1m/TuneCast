import styled from "styled-components";
import { useEffect, useState,Fragment } from "react";
import {Header, Footer, AudioPlayer} from "../components"
import mapicon from "../assets/images/mapping_icon.png"
import alarm from "../assets/music/alarm.mp3"


export default function Weather() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("서울");
  const sites = ["서울", "부산", "대전", "대구", "인천", "광주", "울산", "세종"];

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
            className={selectedItem === site ? "selected" : ""}
          >
            {site}
          </SiteList>
        ))}
        </ul>
      </Menu>
    </MenuWrapper>

    )}
    <Main>
        {/* <AudioPlayer src={alarm} /> */}
        <MainSection>

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
