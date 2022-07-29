import { handler } from "./createGame/index.js";

const queryStringParameters = {};
const body = {
  dimension: 19,
};
const event = {
  body: JSON.stringify(body),
  queryStringParameters: queryStringParameters,
};

handler(event)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => console.log(error));
