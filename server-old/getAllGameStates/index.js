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
  let response;
  try {
    const result = await client.query("SELECT * FROM game_state");
    response = {
      statusCode: 200,
      body: JSON.stringify(result.rows),
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
