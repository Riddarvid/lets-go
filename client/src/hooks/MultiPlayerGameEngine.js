import { useCallback, useEffect, useRef, useState } from "react";
import {
  GameLogic,
  getOppositeColor,
  stringToSquares,
} from "../helpers/gameLogic";

const backendUrl =
  "https://gqzmvnpow7.execute-api.eu-north-1.amazonaws.com/test";

const useMultiPlayerGameEngine = ({ dimension, uuid }) => {
  const [gameState, setGameState] = useState(null);
  const gameLogic = useRef(null);

  const fetchGameState = useCallback(async () => {
    if (!uuid) {
      return;
    }
    try {
      const response = await fetch(backendUrl + "/game?uuid=" + uuid);
      const result = await response.json();
      if (!result.gameState) {
        return;
      }
      const newGameState = { ...result.gameState };
      newGameState.squares = stringToSquares(newGameState.squares);
      newGameState.dimension = Math.sqrt(newGameState.squares.length);
      setGameState(newGameState);
      gameLogic.current = new GameLogic(newGameState.dimension);
    } catch (error) {
      console.log("Error fetching multiplayer game");
    }
  }, [uuid]);

  useEffect(() => {
    fetchGameState();
  }, [uuid, fetchGameState]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchGameState();
    }, 2 * 1000); //Refresh every 2 seconds

    return () => clearInterval(interval);
  }, [fetchGameState]);

  const onSquareClicked = async (row, column) => {
    const newSquareData = gameLogic.current.executeMove(gameState, row, column);
    if (newSquareData !== null) {
      let newGameState = { ...gameState };
      newGameState.squares = newSquareData;
      newGameState.turn = getOppositeColor(gameState.turn);
      setGameState(newGameState);
      await fetch(backendUrl + "/move", {
        method: "POST",
        body: JSON.stringify({
          uuid,
          row,
          column,
        }),
      });
    }
  };

  return { gameState, onSquareClicked, dimension };
};

export default useMultiPlayerGameEngine;
