import styled from "styled-components";

const MainContainer = (variant) => {
  variant = row ? "row" : "column";
  return styled.div`
    position: relative;
    margin: 35px 120px;
    width: 1200px;
    height: 640px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${variant};
    padding: 50px;
    justify-content: space-between; 
    align-items: center;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.3);
    `;
}
export default MainContainer;