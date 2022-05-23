import { Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { GameLogic, getOppositeColor } from "../helpers/gameLogic";
import Board from "./Board";

const SingleplayerGame = ({ dimension, squareSize }) => {
  const [squareData, setSquareData] = useState(
    Array(dimension * dimension).fill(null)
  );
  const [currentColor, setCurrentColor] = useState("black");
  const gameLogic = useRef(new GameLogic(dimension));

  const onSquareClicked = (row, column) => {
    const newSquareData = gameLogic.current.executeMove(
      squareData,
      row,
      column,
      currentColor
    );
    if (newSquareData !== null) {
      setSquareData(newSquareData);
      const newColor = getOppositeColor(currentColor);
      setCurrentColor(newColor);
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Board
        dimension={dimension}
        squareSize={squareSize}
        squareData={squareData}
        onSquareClicked={onSquareClicked}
      />
      <Typography variant="h1">{currentColor + "'s turn"}</Typography>
    </Stack>
  );
};

export default SingleplayerGame;
