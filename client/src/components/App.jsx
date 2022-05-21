import React from "react";
import Board from "./Board";
import TopBar from "./TopBar";

const App = () => {
  return (
    <React.Fragment>
      <TopBar />
      <Board dimension={19} squareSize={45} />
    </React.Fragment>
  );
};

export default App;
