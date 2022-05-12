import { Box, Stack } from "@mui/material";
import { useState } from "react";
import BoardRow from "./BoardRow";

const Board = ({ dimension }) => {
  const [squareData, setSquareData] = useState(
    Array(dimension * dimension).fill(null)
  );
  const [currentColor, setCurrentColor] = useState("black");

  const onSquareClicked = (row, column) => {
    console.log("User clicked " + column + " x " + row);
    const index = row * dimension + column;
    if (squareData[index] === null) {
      let newSquareData = [...squareData];
      newSquareData[index] = currentColor;
      setSquareData(newSquareData);
      const newColor = currentColor === "black" ? "white" : "black";
      setCurrentColor(newColor);
    }
  };

  const renderBoardRows = () => {
    let boardRows = [];
    //Divide the squares into dimension length chunks.
    for (let i = 0; i < dimension; i++) {
      boardRows.push(
        <BoardRow
          key={i}
          squareData={squareData.slice(
            i * dimension,
            i * dimension + dimension
          )}
          onBoardSquareClicked={onSquareClicked}
          rowIndex={i}
        />
      );
    }
    return boardRows;
  };

  const boardRows = renderBoardRows();

  return (
    <Box>
      <Stack sx={{ width: "fit-content", backgroundColor: "brown" }}>
        {boardRows}
      </Stack>
    </Box>
  );
};

export default Board;
