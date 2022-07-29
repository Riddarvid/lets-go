import pg from "pg";
import {
  GameLogic,
  getOppositeColor,
  squaresToString,
  stringToSquares,
} from "./gameLogic.js";

const { Client } = pg;

//TODO remove credentials
const client = new Client({
  user: "postgres",
  password: "x$ksLfuV7WD8ECKN7^Wf",
  host: "lets-go.c6pcl5yvnycx.eu-north-1.rds.amazonaws.com",
  database: "lets-go",
  port: 5432,
});
try {
  client.connect();
} catch (error) {
  console.log("Could not connect to database");
  console.log(error);
}

const handler = async (event) => {
  //1. Select the correct game state using the getGameState lambda
  let response = { headers: { "Access-Control-Allow-Origin": "*" } };
  try {
    const { uuid, row, column } = JSON.parse(event.body);

    const gameState = await getGameState(uuid);
    if (gameState === null) {
      response = {
        ...response,
        statusCode: 404,
        body: JSON.stringify({
          error: "No game with matching url found",
        }),
      };
      return response;
    }

    gameState.squares = stringToSquares(gameState.squares);

    //2. Try the move using gameLogic. If the move is valid, insert the new game state into the database. Send a positive response.
    const gameLogic = new GameLogic(Math.sqrt(gameState.squares.length));
    const newSquareData = gameLogic.executeMove(gameState, row, column);

    //3. If the move was invalid, send an error response.
    if (newSquareData === null) {
      response = {
        ...response,
        statusCode: 400,
        body: JSON.stringify({
          error: "Illegal move",
        }),
      };
      return response;
    }

    const squareString = squaresToString(newSquareData);

    const query =
      "UPDATE game_state " +
      "SET squares = $1, turn = $2 " +
      "FROM players " +
      "WHERE game_state.id = players.game_state_id AND players.uuid = $3";
    const values = [squareString, getOppositeColor(gameState.turn), uuid];
    client.query(query, values);
    response.statusCode = 200;
    return response;
  } catch (e) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      error: e,
      message: "Something went wrong",
    });
    return response;
  }
};

const getGameState = async (uuid) => {
  const selectResponse = await client.query(
    "SELECT squares, turn, color FROM players LEFT JOIN game_state ON players.game_state_id = game_state.id WHERE uuid = $1",
    [uuid]
  );
  if (selectResponse.rowCount === 0) {
    return null;
  } else {
    return selectResponse.rows[0];
  }
};

export { handler };
