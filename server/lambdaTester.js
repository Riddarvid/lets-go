import { handler } from "./makeMove/index.js";

const queryStringParameters = {};
const body = {
  uuid: "f792f80e-037f-46f6-8b9f-460d31431ec0",
  row: 4,
  column: 6,
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
