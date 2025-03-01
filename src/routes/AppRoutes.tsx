import Home from "../pages/home/Home";
import PlayTrivia from "../pages/playTrivia/PlayTrivia";
import { BrowserRouter, Routes, Route } from "react-router";
import "../index.css";

function AppRoutes() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play-trivia" element={<PlayTrivia/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default AppRoutes;

