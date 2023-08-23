import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

//DB connection outside handler for sharing
const dbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dbClient);

const getGameFromDb = async (uuid) => {
  const blackCommand = new QueryCommand({
    TableName: process.env.TABLE,
    IndexName: "BlackId-index",
    KeyConditionExpression: "BlackId = :id",
    ExpressionAttributeValues: {
      ":id": uuid,
    },
  });

  let response = await docClient.send(blackCommand);
  console.log(response);
  if (response.Count > 0) {
    return response.Items[0];
  }

  const whiteCommand = new QueryCommand({
    TableName: process.env.TABLE,
    IndexName: "WhiteId-index",
    KeyConditionExpression: "WhiteId = :id",
    ExpressionAttributeValues: {
      ":id": uuid,
    },
  });

  response = await docClient.send(whiteCommand);
  console.log(response);
  if (response.Count > 0) {
    return response.Items[0];
  }

  return null;
};

const registerConnection = async (event, gameEntry, userId) => {
  console.log(event, gameEntry, userId);
  const connField =
    gameEntry.BlackId === userId ? "BlackConnId" : "WhiteConnId";
  const command = new UpdateCommand({
    TableName: process.env.TABLE,
    Key: {
      GameId: gameEntry.GameId,
    },
    UpdateExpression: "set " + connField + " = :cid",
    ExpressionAttributeValues: {
      ":cid": event.requestContext.connectionId,
    },
  });
  await docClient.send(command);
};

export const handler = async (event) => {
  const { uuid } = JSON.parse(event.body);

  let gameEntry;
  try {
    gameEntry = await getGameFromDb(uuid);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      error: "Error encountered while fetching game data: " + error,
    };
  }
  console.log(gameEntry);

  try {
    await registerConnection(event, gameEntry, uuid);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: {
        error: "Error encountered while registering game data: " + error,
      },
    };
  }
  return {
    statusCode: 200,
  };
};
