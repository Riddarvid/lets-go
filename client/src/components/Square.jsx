import { Box } from "@mui/material";
import { pixels } from "../helpers/helpers";
import { getSquare } from "../helpers/squares";
import Stone from "./Stone";

const Square = ({
  dimension,
  squareSize,
  rowIndex,
  columnIndex,
  color,
  onClick,
}) => {
  const square = getSquare(dimension, rowIndex, columnIndex, squareSize);

  return (
    <Box
      sx={{
        display: "flex",
        width: pixels(squareSize),
        height: pixels(squareSize),
        backgroundImage: square.image,
        backgroundPosition: square.position,
        backgroundSize: square.size,
        backgroundRepeat: square.repeat,
      }}
      onClick={() => onClick(columnIndex)}
      justifyContent="center"
      alignItems="center"
    >
      <Stone color={color} />
    </Box>
  );
};

export default Square;
