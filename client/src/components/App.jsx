import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MultiplayerGame from "./MultiplayerGame";
import SingleplayerGame from "./SingleplayerGame";
import TopBar from "./TopBar";

const squareSize = 46;

const App = () => {
  return (
    <React.Fragment>
      <TopBar />
      <Routes>
        <Route index element={<Navigate to="/singleplayer" />} />
        <Route path="/multiplayer/:uuid" element={<MultiplayerGame />} />
        <Route
          path="/singleplayer"
          element={<SingleplayerGame squareSize={squareSize} />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default App;
