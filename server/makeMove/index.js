import pg from "pg";
const { Client } = pg;

const backendUrl =
  "https://gqzmvnpow7.execute-api.eu-north-1.amazonaws.com/test";

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
  const { uuid, row, column } = JSON.parse(event.body);
  //TODO:
  //1. Select the correct game state, prefferably using the getGameState lambda
  //2. Try the move using gameLogic. If the move is valid, insert the new game state into the database. Send a positive response.
  //3. If the move was invalid, send an error response.
};

export { handler };
