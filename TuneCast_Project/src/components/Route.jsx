import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import MemberPage from "../pages/TuneCastPage";
import Chart from "../pages/Chart";
import Playlist from "../pages/Playlist";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member" element={<MemberPage />} />
        <Route path="/playlist" exact element={<Playlist />} />
        <Route path="/playlist/:id" element={<Playlist/>} />
        <Route path="/mypage" element={<Chart />}/>
      </Routes>
    </BrowserRouter>
  );
}