import { handler } from "./getGameState/index.js";

const queryStringParameters = {
  uuid: "cb720910-a06b-4ec8-86e3-0a8c2a524482",
};
const body = {};
const event = {
  body: JSON.stringify(body),
  queryStringParameters: queryStringParameters,
};

handler(event)
  .then((response) => {
    console.log(response);
    console.log(JSON.parse(response.body));
  })
  .catch((error) => console.log(error));
