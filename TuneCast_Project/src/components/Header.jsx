import styled from "styled-components";
import {Link} from "react-router-dom";
import {useState} from 'react';
import menuicon from "../assets/images/menu_icon.png";
import backicon from "../assets/images/back_icon.png";
import avataricon from "../assets/images/avatar_icon.png";


function Header({ isMainPage, onMenuClick }) { //main페이지에서만 isMainPage=True, onMenuClick은 메뉴 버튼이 클릭 되었을 때 실행될 함수 넣어주는 것
    //Link의 href는 나중에 마이페이지 구현 완료 된 뒤에 거기 경로로 연결
  return (
    <HeaderContainer>
      {isMainPage ? (
        <IconButton onClick={onMenuClick}>
          <img src={menuicon} alt={"menu"}/>
        </IconButton>
      ) : (
        <IconButton onClick={() => window.history.back()}>
          <img src={backicon} alt="back"/>
        </IconButton>
      )}
      <Logo>TuneCast</Logo>
      {/* <Link to="/"> */}
      <img src={avataricon} alt={"Avatar"} />
      {/* </Link> */}
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.51);
  height: 120px;
  padding: 0 20px;
`;

const Logo = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: #676767;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
`;