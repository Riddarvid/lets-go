import React from "react";
import useSinglePlayerGameEngine from "../hooks/SinglePlayerGameEngine";
import Game from "./Game";

const SingleplayerGame = ({ dimension, boardSize }) => {
  const gameEngine = useSinglePlayerGameEngine({ dimension });

  return <Game boardSize={boardSize} gameEngine={gameEngine} />;
};

export default SingleplayerGame;
