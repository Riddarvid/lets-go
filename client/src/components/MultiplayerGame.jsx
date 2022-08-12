import React from "react";
import useMultiPlayerGameEngine from "../hooks/MultiPlayerGameEngine";
import Game from "./Game";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const MultiplayerGame = ({ dimension, boardSize }) => {
  const { uuid } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const gameEngine = useMultiPlayerGameEngine({ dimension, uuid });
  const navigate = useNavigate();

  useEffect(() => {
    if (gameEngine.error) {
      enqueueSnackbar("No game with that id found.", { variant: "error" });
      navigate("/");
    }
  }, [gameEngine.error]);

  if (gameEngine.loading) {
    return (
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        height="90vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <Game boardSize={boardSize} gameEngine={gameEngine} />;
};

export default MultiplayerGame;
