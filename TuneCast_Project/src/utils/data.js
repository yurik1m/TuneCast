import cloud from "../assets/images/cloud.png"
import rain from "../assets/images/rain.png"
import wsnow from "../assets/images/snow.png"
import sun from "../assets/images/sun.png"
import fog from "../assets/images/fog.png"


export const sites = [{name: "서울", //지역, 위도, 경도
                  id: "Seoul",  },
                  {name: "부산",
                  id: "Busan",  },
                  {name: "대전", 
                  id: "Daejeon",},
                  {name: "대구",
                  id: "Daegu",  },
                  {name: "인천",
                  id: "Incheon",},
                  {name: "광주",
                  id: "Gwangju",},
                  {name: "울산",
                  id: "Ulsan",  },
                  {name: "세종",
                  id: "Sejong", },
                ];
  export const weathers = [{name: "맑음",src: {sun}},    //날씨 + 아이콘 배열
                    {name: "구름",src: {cloud}},
                    {name: "비",src: {rain}},
                    {name: "눈",src: {wsnow}},
                    {name: "안개",src: {fog}}];