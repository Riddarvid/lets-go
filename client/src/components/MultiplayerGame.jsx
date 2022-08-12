import React from "react";
import useMultiPlayerGameEngine from "../hooks/MultiPlayerGameEngine";
import Game from "./Game";
import { Navigate, useParams } from "react-router-dom";

const MultiplayerGame = ({ dimension, boardSize }) => {
  const { uuid } = useParams();
  const gameEngine = useMultiPlayerGameEngine({ dimension, uuid });
  if (gameEngine.error) {
    return <Navigate to={"/"} />;
  }

  return <Game boardSize={boardSize} gameEngine={gameEngine} />;
};

export default MultiplayerGame;
