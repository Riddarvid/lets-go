import pg from "pg";
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
  console.log("Request recieved");
  const uuid = event.queryStringParameters.uuid;
  console.log(uuid);
  let response;
  try {
    const selectResponse = await client.query(
      "SELECT squares, turn, color FROM players LEFT JOIN game_state ON players.game_state_id = game_state.id WHERE uuid = $1",
      [uuid]
    );
    if (selectResponse.rowCount === 0) {
      response = {
        statusCode: 404,
        body: JSON.stringify({ error: "No game with matching url found" }),
      };
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify({ gameState: selectResponse.rows[0] }),
      };
    }
  } catch (error) {
    console.log(error);
    response = {
      statusCode: 500,
      body: JSON.stringify("Error executing query"),
    };
  } finally {
    response = {
      ...response,
      headers: { "Access-Control-Allow-Origin": "*" },
    };
    return response;
  }
};

export { handler };
