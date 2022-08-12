import pg from "pg";
import crypto from "crypto";
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
  const body = JSON.parse(event.body);
  let response;
  try {
    const gameId = await createGame(body.dimension);
    const blackUUID = await createPlayer("black", gameId);
    const whiteUUID = await createPlayer("white", gameId);
    response = {
      statusCode: 200,
      body: JSON.stringify({ blackUUID, whiteUUID }),
    };
  } catch (error) {
    console.log(error);
    response = {
      statusCode: 500,
      body: JSON.stringify("Error executing query"),
    };
  } finally {
    response.headers = { "Access-Control-Allow-Origin": "*" };
    return response;
  }
};

const createGame = async (dimension) => {
  const squares = Array(dimension * dimension)
    .fill(0)
    .join("");
  const result = await client.query(
    "INSERT INTO game_state(squares, turn) VALUES ($1, 'black') RETURNING id",
    [squares]
  );
  //Returns the id of the created game
  return result.rows[0].id;
};

const createPlayer = async (color, gameId) => {
  let uuid;
  while (true) {
    uuid = crypto.randomUUID();
    const selectResponse = await client.query(
      "SELECT * FROM players WHERE uuid=$1",
      [uuid.toString()]
    );
    if (selectResponse.rowCount === 0) {
      break;
    }
  }
  await client.query(
    "INSERT INTO players(color, game_state_id, uuid) VALUES ($1, $2, $3)",
    [color, gameId, uuid]
  );
  return uuid;
};

export { handler };
