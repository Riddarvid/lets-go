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
  const dimension = body.dimension;
  console.log(dimension);
  let response;
  try {
    let url;
    while (true) {
      url = crypto.randomUUID();
      const selectResponse = await client.query(
        "SELECT * FROM game_state WHERE url=$1",
        [url.toString()]
      );
      if (selectResponse.rowCount === 0) {
        console.log("Found unique id");
        break;
      }
    }
    const squares = Array(dimension * dimension)
      .fill(0)
      .join("");
    await client.query(
      "INSERT INTO game_state(squares, turn, url) VALUES ($1, 'black', $2)",
      [squares, url]
    );
    response = {
      statusCode: 200,
      body: JSON.stringify({ url: url }),
    };
  } catch (error) {
    console.log(error);
    response = {
      statusCode: 500,
      body: JSON.stringify("Error executing query"),
    };
  } finally {
    return response;
  }
};

export { handler };
