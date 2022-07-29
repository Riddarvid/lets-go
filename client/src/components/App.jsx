<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useRef, useState } from "react";
>>>>>>> git-error
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MultiplayerGame from "./MultiplayerGame";
import SingleplayerGame from "./SingleplayerGame";
import TopBar from "./TopBar";

const App = () => {
  const [boardSize, setBoardSize] = useState(null);
<<<<<<< HEAD

  useEffect(() => {
    let [windowWidth, windowHeight] = [window.innerWidth, window.outerHeight];
    const smallestSide =
      windowWidth < windowHeight ? windowWidth : windowHeight;
    setBoardSize(smallestSide * 0.65);
=======
  const dimension = useRef(19);

  useEffect(() => {
    let [windowWidth, windowHeight] = [window.innerWidth, window.outerHeight];
    console.log(windowWidth, windowHeight);
    let smallestSide;
    if (windowWidth < windowHeight) {
      smallestSide = windowWidth;
    } else {
      smallestSide = windowHeight * 0.69;
    }
    console.log(smallestSide);
    setBoardSize(smallestSide);
>>>>>>> git-error
  }, []);

  return (
    <React.Fragment>
      <TopBar />
      <Routes>
        <Route index element={<Navigate to="/singleplayer" />} />
        <Route
          path="/multiplayer/:uuid"
          element={
            <MultiplayerGame
              boardSize={boardSize}
              dimension={dimension.current}
            />
          }
        />
        <Route
          path="/singleplayer"
          element={
            <SingleplayerGame
              boardSize={boardSize}
              dimension={dimension.current}
            />
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default App;
