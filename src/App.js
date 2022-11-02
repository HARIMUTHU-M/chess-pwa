import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import "./index.css";

const Home = lazy(() => import("./components/Home"));
const Chess = lazy(() => import("./components/Chess"));
const ChessMultiplayer = lazy(() => import("./components/ChessMultiplayer"));

const App = () => {

  const [difficulty, setDifficulty] = useState(1)
  
  const [roomno, setRoomno] = useState();

  return (
    <div className="">
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home setDifficulty={setDifficulty} setRoomno={setRoomno}/>} />
            <Route path="/game" element={<Chess difficulty={difficulty} />} />
            <Route path="/multiplayer" element={<ChessMultiplayer roomno={roomno} />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
