import React from "react";
import MultiplayerGame from "./MultiplayerGame";
import TopBar from "./TopBar";

const App = () => {
  return (
    <React.Fragment>
      <TopBar />
      <MultiplayerGame
        squareSize={46}
        gameId="29d9428c-d579-4f73-bd16-b5c02c70590c"
      />
    </React.Fragment>
  );
};

export default App;
