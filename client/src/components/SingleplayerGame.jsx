import { Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { GameLogic, getOppositeColor } from "../helpers/gameLogic";
import Board from "./Board";

const SingleplayerGame = ({ squareSize }) => {
  const dimension = 19;
  const [gameState, setGameState] = useState({
    squares: Array(dimension * dimension).fill(null),
    turn: "black",
  });
  const gameLogic = useRef(new GameLogic(dimension));

  const onSquareClicked = (row, column) => {
    const newSquareData = gameLogic.current.executeMove(gameState, row, column);
    if (newSquareData !== null) {
      setGameState({
        squares: newSquareData,
        turn: getOppositeColor(gameState.turn),
      });
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Board
        dimension={dimension}
        squareSize={squareSize}
        squareData={gameState.squares}
        onSquareClicked={onSquareClicked}
      />
      <Typography variant="h1">{gameState.turn + "'s turn"}</Typography>
    </Stack>
  );
};

export default SingleplayerGame;
