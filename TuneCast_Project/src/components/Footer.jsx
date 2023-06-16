import styled from "styled-components"
import {Link} from "react-router-dom"

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return(
        <StyledFooter>
            <Link to="/member">
                <StyledA>
                    <Tooltip>{currentYear} &copy;TuneCast</Tooltip>
                </StyledA>
            </Link>
        </StyledFooter>
    );
}
//  
const StyledFooter = styled.footer`
    position: relative;
    background-color:rgba(255, 255, 255, 0.51);
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 50px;
    width: 100vw;
    height: 100px;
    bottom: 0;
    left: 0;
`;

const StyledA = styled.a`
    color: #666666;
    font-size: 20px;
`;

const Tooltip = styled.p`
  position: relative;
  &:hover::before {
    content: "프로젝트 정보 더보기";
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #333;
    color: #fff;
    padding: 10px;
  }
`;
