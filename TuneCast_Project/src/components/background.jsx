import { styled } from "styled-components";
import { fetchGradient } from "../styles/Gradient";

const Background = () => {
  const variant = sessionStorage.getItem('currentWeather');

  gradient = fetchGradient(variant);

  return styled.div`
    background-color: ${gradient};
  `;
}

export default Background;