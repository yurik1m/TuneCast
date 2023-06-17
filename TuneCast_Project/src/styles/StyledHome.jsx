import { styled } from "styled-components";

export const MenuWrapper = styled.div`
  position: ${({ isOpen }) => (isOpen ? "fixed" : "static")};
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ isOpen }) => (isOpen ? "100%" : "auto")};
  overflow: ${({ isOpen }) => (isOpen ? "auto" : "visible")};
  z-index: 1;
`;

export const Menu = styled.div`
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

export const SiteList = styled.li`
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
export const Main = styled.main`
  width: 1200px;
  margin: 120px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MainContainer = styled.div`
    position: relative;
    margin: 35px 120px;
    width: 1200px;
    height: 640px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 50px;
    justify-content: space-between; 
    align-items: center;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.3);
  `;

export const PlayContainer = styled.div`
  width: 500px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  padding: 20px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.3);
`
export const PlayCover = styled.img`
  width: 205px;
  height: 205px;
`

export const PlayDetail = styled.div`
  width: 250px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  align-items: start;
  margin-left: 20px;
`
export const PlayTitle = styled.h3`
  font-size: 25px;
  font-weight: 700;
`

export const PlayButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0);
  padding: 0;
  border-radius: 50%;
`

export const ButtonImg = styled.img`
  width: 40px;
`
export const Back = styled.button`
  position: absolute;
  top: 13px;
  left: 13px;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0);
  padding: 0;
  border-radius: 50%;
`
export const CurrentWeatherContainer = styled.div`
  width: 675px;
  height: 340px;
  display: flex;
  align-items: center;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.3);
  justify-content: space-evenly;
  `
  export const CurrentWeatherIcon = styled.img`
    width: 250px;
    height: 250px;
  `
  export const Icon = styled.img`
    width: 120px;
    height: 120px;
  `

  export const CurrentWeatherInfoContainer = styled.div`
    width: 275px;
    height: 275px;
    display: flex;
    flex-direction: column;
    align-items: start;
  `

  export const City = styled.div`
    width: 90px;
    height: 40px;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.5);
    font-size: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 0;
  `

  export const Text = styled.p`
    font-size: 20px;
    margin: 5px 0;
  `
  export const Report = styled.div`
    width: 250px;
    height: 50px;
    border-radius: 30px;
    background-color: rgb(250, 198, 198, 0.5);
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: start;
    margin: 5px 0;
  `
  export const Special = styled.div`
    background-color: #FF8888;
    margin-right: 10px;
    width: 50px;
    height: 40px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
  `

  export const Temp = styled.div`
    display: flex;
    align-items: end;
    margin: 5px 0;
  `

  export const CurrentTemp = styled.p`
    font-size: 40px;
    margin-right: 10px;
  `

  export const MinTemp = styled.p`
    font-size: 20px;
    color: blue;
  `

  export const MaxTemp = styled.p`
    font-size: 20px;
    color: red;
  `

  export const ForcastContainer = styled.div`
    width: 1120px;
    height: 215px;
    display: flex;
    align-items: center;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.3);
    justify-content: space-evenly;
    margin-top: 20px;
  `
  export const DayContainer = styled.div`
    width: 150px;
    height: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  `

  export const Weather = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `

