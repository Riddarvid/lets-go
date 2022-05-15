import { Box, Stack } from "@mui/material";
import { useRef, useState } from "react";
import BoardRow from "./BoardRow";
import { GameLogic, getOppositeColor } from "../helpers/gameLogic";

const Board = ({ dimension }) => {
  const [squareData, setSquareData] = useState(
    Array(dimension * dimension).fill(null)
  );
  const [currentColor, setCurrentColor] = useState("black");
  const gameLogic = useRef(new GameLogic(dimension));

  const onSquareClicked = (row, column) => {
    console.log("User clicked " + column + " x " + row);
    const newSquareData = gameLogic.current.executeMove(
      squareData,
      row,
      column,
      currentColor
    );
    if (newSquareData !== null) {
      setSquareData(newSquareData);
      const newColor = getOppositeColor(currentColor);
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
