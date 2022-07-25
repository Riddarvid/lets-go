import { Box, Stack } from "@mui/material";
import BoardRow from "./BoardRow";
import { pixels } from "../helpers/helpers";

const Board = ({ dimension, boardSize, squareData, onSquareClicked }) => {
  if (squareData === null) {
    return null;
  }

  const squareSize = boardSize / dimension;

  const renderBoardRows = () => {
    let boardRows = [];
    //Divide the squares into dimension length chunks.
    for (let i = 0; i < dimension; i++) {
      boardRows.push(
        <BoardRow
          key={i}
          rowIndex={i}
          dimension={dimension}
          squareSize={squareSize}
          squareData={squareData.slice(
            i * dimension,
            i * dimension + dimension
          )}
          onBoardSquareClicked={onSquareClicked}
        />
      );
    }
    return boardRows;
  };

  const boardRows = renderBoardRows();

  return (
    <Box>
      <Stack
        sx={{
          p: pixels(squareSize / 2),
          width: "fit-content",
          backgroundColor: "brown",
        }}
      >
        {boardRows}
      </Stack>
    </Box>
  );
};

export default Board;
