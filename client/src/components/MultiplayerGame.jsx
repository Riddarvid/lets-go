import React from "react";
import useMultiPlayerGameEngine from "../hooks/MultiPlayerGameEngine";
import Game from "./Game";
import { Navigate, useParams } from "react-router-dom";
import { Box, CircularProgress, Container } from "@mui/material";

const MultiplayerGame = ({ dimension, boardSize }) => {
  const { uuid } = useParams();
  const gameEngine = useMultiPlayerGameEngine({ dimension, uuid });
  if (gameEngine.error) {
    return <Navigate to={"/"} />;
  }
  if (gameEngine.loading) {
    return (
      <Container>
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          height="90vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return <Game boardSize={boardSize} gameEngine={gameEngine} />;
};

export default MultiplayerGame;
