import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import "./index.css";

const Home = lazy(() => import("./components/Home"));
const Chess = lazy(() => import("./components/Chess"));

const Main = () => {
  return (
    <div className="">
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Chess />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default Main;
