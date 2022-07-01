import { Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GameLogic,
  getOppositeColor,
  stringToSquares,
} from "../helpers/gameLogic";
import Board from "./Board";

const backendUrl =
  "https://gqzmvnpow7.execute-api.eu-north-1.amazonaws.com/test";

const MultiplayerGame = ({ squareSize }) => {
  const { uuid } = useParams();
  const [gameState, setGameState] = useState(null);
  const gameLogic = useRef(null);

  useEffect(() => {
    const fetchGameState = async () => {
      const response = await fetch(backendUrl + "/game?uuid=" + uuid);
      const result = await response.json();
      if (result.gameState) {
        const newGameState = { ...result.gameState };
        newGameState.squares = stringToSquares(newGameState.squares);
        newGameState.dimension = Math.sqrt(newGameState.squares.length);
        setGameState(newGameState);
        gameLogic.current = new GameLogic(newGameState.dimension);
      }
    };
    if (uuid) {
      fetchGameState();
    }
  }, [uuid]);

  const onSquareClicked = async (row, column) => {
    const newSquareData = gameLogic.current.executeMove(gameState, row, column);
    if (newSquareData !== null) {
      let newGameState = { ...gameState };
      newGameState.squares = newSquareData;
      newGameState.turn = getOppositeColor(gameState.turn);
      setGameState(newGameState);
      const postResponse = await fetch(backendUrl + "/move", {
        method: "POST",
        body: JSON.stringify({
          uuid,
          row,
          column,
        }),
      });
      console.log(postResponse);
      //TODO send move to backend
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Board
        dimension={gameState ? gameState.dimension : null}
        squareSize={squareSize}
        squareData={gameState ? gameState.squares : null}
        onSquareClicked={onSquareClicked}
      />
      <Typography variant="h1">
        {gameState
          ? gameState.turn + "'s turn. Playing as " + gameState.color + "."
          : ""}
      </Typography>
    </Stack>
  );
};

export default MultiplayerGame;
