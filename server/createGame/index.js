import crypto from "crypto";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

//DB connection outside handler for sharing
const dbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dbClient);

//Everything breaks if there is a collision. Will probably have to use a real RDS
//to be able to avoid this.
const createGame = async (size) => {
  const gameId = crypto.randomUUID();
  const blackId = crypto.randomUUID();
  const whiteId = crypto.randomUUID();

  const command = new PutCommand({
    TableName: process.env.TABLE,
    Item: {
      GameId: gameId,
      BlackId: blackId,
      WhiteId: whiteId,
      BlackTurn: true,
      SquareData: Array(size * size)
        .fill(0)
        .join(""),
    },
  });

  await docClient.send(command);
  return {
    blackId: blackId,
    whiteId: whiteId,
  };
};

const notifyCreator = async (event, ids) => {
  //Establish callback url
  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const callbackUrl = `https://${domain}/${stage}`; //Same api as message was received from.
  const client = new ApiGatewayManagementApiClient({ endpoint: callbackUrl });

  const command = new PostToConnectionCommand({
    ConnectionId: event.requestContext.connectionId, //Send back to sender
    Data: JSON.stringify({
      type: "game-created",
      data: ids,
    }),
  });

  await client.send(command);
};

export const handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log(body);

  let ids;
  try {
    ids = await createGame(body.size);
  } catch (error) {
    console.error("Error creating game: ", error);
    return {
      statusCode: 500,
    };
  }

  try {
    notifyCreator(event, ids);
  } catch (error) {
    console.error("Error notifying creator.");
    return {
      statusCode: 500,
    };
  }
  return {
    statusCode: 200,
  };
};
