import { useCallback, useEffect, useRef, useState } from "react";
import {
  GameLogic,
  getOppositeColor,
  stringToSquares,
} from "../helpers/gameLogic";

const apiUrl =
  "wss://b93z3z9h0c.execute-api.eu-north-1.amazonaws.com/production";

const useMultiPlayerGameEngine = ({ dimension, uuid }) => {
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const gameLogic = useRef(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (ws === null) {
      ws = new WebSocket(apiUrl);
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        switch (msg.type) {
          case "game-state":
            const newGameState = { ...msg.data };
            newGameState.squares = stringToSquares(newGameState.squares);
            newGameState.dimension = Math.sqrt(newGameState.squares.length);
            setGameState(newGameState);
            setLoading(false);
            gameLogic.current = new GameLogic(newGameState.dimension);
            break;
          default:
            break;
        }
      };
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            action: "registerConnection",
            uuid: uuid,
          })
        );
        ws.send(
          JSON.stringify({
            action: "getGame",
            uuid: uuid,
          })
        );
      };
      setWs(ws);
    }
  }, [ws, uuid]);

  const onSquareClicked = async (row, column) => {
    const newSquareData = gameLogic.current.executeMove(gameState, row, column);
    if (newSquareData !== null) {
      let newGameState = { ...gameState };
      newGameState.squares = newSquareData;
      newGameState.turn = getOppositeColor(gameState.turn);
      setGameState(newGameState);
      ws.send(
        JSON.stringify({
          uuid,
          row,
          column,
        })
      );
    }
  };

  return { gameState, onSquareClicked, dimension, error, loading };
};

export default useMultiPlayerGameEngine;
