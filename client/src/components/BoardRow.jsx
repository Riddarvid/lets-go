import { Stack } from "@mui/material";
import Square from "./Square";

const BoardRow = ({ squareData, rowIndex, onBoardSquareClicked }) => {
  const onRowSquareClicked = (columnIndex) => {
    onBoardSquareClicked(rowIndex, columnIndex);
  };

  const squares = squareData.map((squareColor, index) => {
    return (
      <Square
        key={index}
        color={squareColor}
        columnIndex={index}
        onClick={onRowSquareClicked}
      />
    );
  });

  return <Stack direction="row">{squares}</Stack>;
};

export default BoardRow;
