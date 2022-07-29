import { pixels } from "./helpers";

const getSquares = (squareSize) => {
  const wholePixels = pixels(squareSize);
  const halfPixels = pixels(squareSize / 2);

  return {
    topLeft: {
      image:
        "linear-gradient(to right, black 2px, transparent 2px), linear-gradient(to bottom, black 2px, transparent 2px)",
      position: halfPixels + " " + halfPixels,
      size: halfPixels + " " + halfPixels,
      repeat: "no-repeat",
    },

    top: {
      image:
        "linear-gradient(to right, black 2px, transparent 2px), linear-gradient(to bottom, black 2px, transparent 2px)",
      position: halfPixels + " " + halfPixels,
      size: wholePixels + " " + halfPixels,
      repeat: "repeat-x",
    },

    topRight: {
      image:
        "linear-gradient(to left, black 2px, transparent 2px), linear-gradient(to bottom, black 2px, transparent 2px)",
      position: 0 + " " + halfPixels,
      size: halfPixels + " " + halfPixels,
      repeat: "no-repeat",
    },

    left: {
      image:
        "linear-gradient(to right, black 2px, transparent 2px), linear-gradient(to bottom, black 2px, transparent 2px)",
      position: halfPixels + " " + halfPixels,
      size: halfPixels + " " + wholePixels,
      repeat: "repeat-y",
    },

    center: {
      image:
        "linear-gradient(to right, black 2px, transparent 2px), linear-gradient(to bottom, black 2px, transparent 2px)",
      position: halfPixels + " " + halfPixels,
    },

    right: {
      image:
        "linear-gradient(to left, black 2px, transparent 2px), linear-gradient(to bottom, black 2px, transparent 2px)",
      position: 0 + " " + halfPixels,
      size: halfPixels + " " + wholePixels,
      repeat: "repeat-y",
    },

    bottomLeft: {
      image:
        "linear-gradient(to right, black 2px, transparent 2px), linear-gradient(to top, black 2px, transparent 2px)",
      position: halfPixels + " 0",
      size: halfPixels + " " + halfPixels,
      repeat: "no-repeat",
    },

    bottom: {
      image:
        "linear-gradient(to right, black 2px, transparent 2px), linear-gradient(to top, black 2px, transparent 2px)",
      position: halfPixels + " 0",
      size: wholePixels + " " + halfPixels,
      repeat: "repeat-x",
    },

    bottomRight: {
      image:
        "linear-gradient(to left, black 2px, transparent 2px), linear-gradient(to top, black 2px, transparent 2px)",
      position: "0 0",
      size: halfPixels + " " + halfPixels,
      repeat: "no-repeat",
    },
  };
};

const getSquare = (dimension, rowIndex, columnIndex, squareSize) => {
  const squares = getSquares(squareSize);

  let y = 0;
  let x = 0;
  if (rowIndex === 0) {
    y = -1;
  } else if (rowIndex === dimension - 1) {
    y = 1;
  }
  if (columnIndex === 0) {
    x = -1;
  } else if (columnIndex === dimension - 1) {
    x = 1;
  }

  if (y === -1) {
    if (x === -1) {
      return squares.topLeft;
    } else if (x === 0) {
      return squares.top;
    } else {
      return squares.topRight;
    }
  } else if (y === 0) {
    if (x === -1) {
      return squares.left;
    } else if (x === 0) {
      return squares.center;
    } else {
      return squares.right;
    }
  } else {
    if (x === -1) {
      return squares.bottomLeft;
    } else if (x === 0) {
      return squares.bottom;
    } else {
      return squares.bottomRight;
    }
  }
};

export { getSquare };
