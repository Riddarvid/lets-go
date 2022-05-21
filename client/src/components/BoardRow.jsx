import { Stack } from "@mui/material";
import Square from "./Square";

const BoardRow = ({
  rowIndex,
  dimension,
  squareSize,
  squareData,
  onBoardSquareClicked,
}) => {
  const onRowSquareClicked = (columnIndex) => {
    onBoardSquareClicked(rowIndex, columnIndex);
  };

  const squares = squareData.map((squareColor, index) => {
    return (
      <Square
        key={index}
        dimension={dimension}
        squareSize={squareSize}
        rowIndex={rowIndex}
        columnIndex={index}
        color={squareColor}
        onClick={onRowSquareClicked}
      />
    );
  });

  return <Stack direction="row">{squares}</Stack>;
};

export default BoardRow;
