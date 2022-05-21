import { handler } from "./createGame/index.js";

handler({ body: { url: '"29d9428c-d579-4f73-bd16-b5c02c70590c"' } })
  .then((response) => console.log(response))
  .catch((error) => console.log(error));
