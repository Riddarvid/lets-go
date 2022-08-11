import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MultiplayerGame from "./MultiplayerGame";
import SingleplayerGame from "./SingleplayerGame";
import TopBar from "./TopBar";

const App = () => {
  const [boardSize, setBoardSize] = useState(null);
  const dimension = useRef(19);

  useEffect(() => {
    let [windowWidth, windowHeight] = [window.innerWidth, window.outerHeight];
    let smallestSide;
    if (windowWidth < windowHeight) {
      smallestSide = windowWidth;
    } else {
      smallestSide = windowHeight * 0.69;
    }
    setBoardSize(smallestSide);
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
