const getOppositeColor = (color) => {
  return color === "black" ? "white" : "black";
};

class GameLogic {
  constructor(dimension) {
    this.dimension = dimension;
  }

  executeMove(squareData, row, column, placedColor) {
    const opponentColor = getOppositeColor(placedColor);
    const newSquareData = [...squareData];
    const linearCoordinate = this.gridToLinear(row, column);
    //Place the stone
    newSquareData[linearCoordinate] = placedColor;
    //For each stone adjacent to the placed stone, check if that stone belongs to a captured group.
    //If true, find the coordinates of all stones in the group and add them to a list.
    const capturedStones = [];
    const neighbours = this.getNeighbours(linearCoordinate);
    neighbours.forEach((neighbour) => {
      capturedStones.push(
        ...this.getGroupIfCaptured(newSquareData, neighbour, opponentColor)
      );
    });
    //If no stone was captured, check if the placed stone belongs to a captured group.
    //If true, the move is invalid. Return null.
    console.log(capturedStones);
    if (capturedStones.length === 0) {
      if (
        this.getGroupIfCaptured(newSquareData, linearCoordinate, placedColor)
          .length > 0
      ) {
        return null;
      }
    }

    this.captureStones(newSquareData, capturedStones);
    return newSquareData;
  }

  getSquare(squareData, row, column) {
    return squareData[this.dimension * row + column];
  }

  setSquare(squareData, row, column, color) {
    squareData[this.dimension * row + column] = color;
  }

  //Could be optimized by breaking as soon as we find a freedom.
  getGroupIfCaptured(squareData, linearCoordinate, targetColor) {
    //Only investigate groups of the appropriate color
    if (squareData[linearCoordinate] !== targetColor) {
      return [];
    }
    const discovered = new Set();
    let toInvestigate = new Set();
    discovered.add(linearCoordinate);
    toInvestigate.add(linearCoordinate);
    while (toInvestigate.size > 0) {
      console.log(toInvestigate);
      const newToInvestigate = new Set();
      //For each in toInvestigate, examine neighbours. If neighbours have not been discovered, check value. If value === null, return []. If value is targetColor, add to toInvestigate.
      let hasFreedom = false;
      toInvestigate.forEach((current) => {
        const neighbours = this.getNeighbours(current);
        neighbours.forEach((neighbour) => {
          if (discovered.has(neighbour)) {
            return;
          }
          if (squareData[neighbour] === null) {
            hasFreedom = true;
            return;
          }
          if (squareData[neighbour] === targetColor) {
            discovered.add(neighbour);
            newToInvestigate.add(neighbour);
          }
        });
      });
      toInvestigate = newToInvestigate;
      if (hasFreedom) {
        return [];
      }
    }
    return [...discovered];
  }

  getNeighbours(linear) {
    const [row, column] = this.linearToGrid(linear);
    const neighbours = [];
    neighbours.push(this.gridToLinear(row + 1, column));
    neighbours.push(this.gridToLinear(row - 1, column));
    neighbours.push(this.gridToLinear(row, column + 1));
    neighbours.push(this.gridToLinear(row, column - 1));
    return neighbours;
  }

  linearToGrid(linear) {
    return [Math.floor(linear / this.dimension), linear % this.dimension];
  }

  gridToLinear(row, column) {
    return row * this.dimension + column;
  }

  hasFreeNeighbour(squareData, row, column) {}

  captureStones(squareData, capturedStones) {
    capturedStones.forEach((stone) => {
      squareData[stone] = null;
    });
  }
}

export { GameLogic, getOppositeColor };
