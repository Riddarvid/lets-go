import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MultiplayerGame from "./MultiplayerGame";
import SingleplayerGame from "./SingleplayerGame";
import TopBar from "./TopBar";

const App = () => {
  const [boardSize, setBoardSize] = useState(null);

  useEffect(() => {
    let [windowWidth, windowHeight] = [window.innerWidth, window.outerHeight];
    const smallestSide =
      windowWidth < windowHeight ? windowWidth : windowHeight;
    setBoardSize(smallestSide * 0.65);
  }, []);

  return (
    <React.Fragment>
      <TopBar />
      <Routes>
        <Route index element={<Navigate to="/singleplayer" />} />
        <Route
          path="/multiplayer/:uuid"
          element={<MultiplayerGame boardSize={boardSize} />}
        />
        <Route
          path="/singleplayer"
          element={<SingleplayerGame boardSize={boardSize} />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default App;
