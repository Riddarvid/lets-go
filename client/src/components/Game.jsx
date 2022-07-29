import { Stack, Typography } from "@mui/material";
import Board from "./Board";

const Game = ({ boardSize, gameEngine }) => {
  if (!boardSize || !gameEngine) {
    return null;
  }
  const { gameState, onSquareClicked, dimension } = gameEngine;

  if (!gameState) {
    return null;
  }

  return (
    <Stack direction="row" spacing={2}>
      <Board
        dimension={dimension}
        boardSize={boardSize}
        squareData={gameState.squares}
        onSquareClicked={onSquareClicked}
      />
      <Typography variant="h1">{gameState.turn + "'s turn"}</Typography>
    </Stack>
  );
};

export default Game;
