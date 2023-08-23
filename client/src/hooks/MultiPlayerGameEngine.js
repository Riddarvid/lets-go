import { useEffect, useRef, useState } from "react";
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
    if (uuid !== null) {
      const newWs = new WebSocket(apiUrl);
      newWs.onmessage = (event) => {
        console.log(event);
        const msg = JSON.parse(event.data);
        switch (msg.type) {
          case "game-state":
            const gameEntry = { ...msg.data };
            const gameData = {
              squareData: stringToSquares(gameEntry.SquareData),
              turn: gameEntry.BlackTurn ? "black" : "white",
              placedColor: gameEntry.BlackId === uuid ? "black" : "white",
            };
            const dimension = Math.sqrt(gameData.squareData.length);
            setGameState(gameData);
            setLoading(false);
            gameLogic.current = new GameLogic(dimension);
            break;
          default:
            break;
        }
      };
      newWs.onopen = () => {
        newWs.send(
          JSON.stringify({
            action: "registerConnection",
            uuid: uuid,
          })
        );
        newWs.send(
          JSON.stringify({
            action: "getGame",
            uuid: uuid,
          })
        );
      };
      setWs(newWs);
    }
  }, [uuid]);

  const onSquareClicked = async (row, column) => {
    const newSquareData = gameLogic.current.executeMove(gameState, row, column);
    if (newSquareData !== null) {
      let newGameState = { ...gameState };
      newGameState.squareData = newSquareData;
      newGameState.turn = getOppositeColor(gameState.turn);
      setGameState(newGameState);
      console.log("Attempting to send message, ws:", ws);
      ws.send(
        JSON.stringify({
          action: "makeMove",
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
