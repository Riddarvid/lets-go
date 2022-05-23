import { Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { GameLogic, getOppositeColor } from "../helpers/gameLogic";
import Board from "./Board";

const backendUrl =
  "https://gqzmvnpow7.execute-api.eu-north-1.amazonaws.com/test";

const MultiplayerGame = ({ squareSize, gameId }) => {
  const [gameState, setGameState] = useState(null);
  const gameLogic = useRef(null);

  useEffect(() => {
    const fetchGameState = async () => {
      const response = await fetch(backendUrl + "/game?uuid=" + gameId);
      const result = await response.json();
      console.log(result);
      if (result.gameState) {
        const newGameState = { ...result.gameState };
        newGameState.squares = newGameState.squares.split("").map((n) => {
          if (n === "0") {
            return null;
          } else if (n === "1") {
            return "black";
          } else {
            return "white";
          }
        });
        console.log(newGameState);
        setGameState(newGameState);
        gameLogic.current = new GameLogic(newGameState.dimension);
      }
    };
    if (gameId) {
      fetchGameState();
    }
  }, [gameId]);

  const onSquareClicked = (row, column) => {
    console.log("Clicked " + row + " " + column);
    console.log(gameState);
    const newSquareData = gameLogic.current.executeMove(
      gameState.squares,
      row,
      column,
      gameState.turn
    );
    console.log(newSquareData);
    if (newSquareData !== null) {
      let newGameState = { ...gameState };
      newGameState.squares = newSquareData;
      newGameState.turn = getOppositeColor(gameState.turn);
      setGameState(newGameState);

      //TODO send move to backend
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Board
        dimension={19}
        squareSize={squareSize}
        squareData={gameState ? gameState.squares : null}
        onSquareClicked={onSquareClicked}
      />
      <Typography variant="h1">
        {gameState ? gameState.turn + "'s turn" : ""}
      </Typography>
    </Stack>
  );
};

export default MultiplayerGame;
