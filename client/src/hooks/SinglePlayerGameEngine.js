import { useRef, useState } from "react";
import { GameLogic, getOppositeColor } from "../helpers/gameLogic";

const useSinglePlayerGameEngine = ({ dimension }) => {
  const gameLogic = useRef(new GameLogic(dimension));
  const [gameState, setGameState] = useState({
    squares: Array(dimension * dimension).fill(null),
    turn: "black",
  });

  const onSquareClicked = (row, column) => {
    const newSquareData = gameLogic.current.executeMove(gameState, row, column);
    if (newSquareData !== null) {
      setGameState({
        squares: newSquareData,
        turn: getOppositeColor(gameState.turn),
      });
    }
  };

  return { gameState, onSquareClicked, dimension };
};

export default useSinglePlayerGameEngine;
