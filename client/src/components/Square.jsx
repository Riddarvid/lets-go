import { Box } from "@mui/material";
import Stone from "./Stone";

const squareSize = "45px";

const Square = ({ color, columnIndex, onClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: squareSize,
        height: squareSize,
      }}
      onClick={() => onClick(columnIndex)}
      justifyContent="center"
      alignItems="center"
      border={1}
    >
      <Stone color={color} />
    </Box>
  );
};

export default Square;
