import styled from "styled-components"
import Link from "next/link"

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return(
        <StyledFooter>
            <Link href="/" passhref >
                <a>{currentYear} &copy;TuneCast
                    <Tooltip/>
                </a>
            </Link>
        </StyledFooter>
    );
}

const StyledFooter = styled.footer`
    background-color: rgba(255, 255, 255, 0.51);
    align-items: center;
    padding-left: 50px;
    width: 100%;
    height: 100px;
    bottom: 0;
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