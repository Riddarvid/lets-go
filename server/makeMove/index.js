import { GameLogic, squaresToString, stringToSquares } from "./gameLogic.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

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

const updateGameData = async (gameId, squareString, blackTurn) => {
  const command = new UpdateCommand({
    TableName: process.env.TABLE,
    Key: {
      GameId: gameId,
    },
    UpdateExpression: "set SquareData = :sd, BlackTurn = :bt",
    ExpressionAttributeValues: {
      ":sd": squareString,
      ":bt": blackTurn,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);
  return response.Attributes;
};

const notifyOpponent = async (event, gameEntry) => {
  //Establish callback url
  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const callbackUrl = `https://${domain}/${stage}`; //Same api as message was received from.
  const client = new ApiGatewayManagementApiClient({ endpoint: callbackUrl });
  console.log(gameEntry);

  const connectionId = gameEntry.BlackTurn
    ? gameEntry.BlackConnId
    : gameEntry.WhiteConnId;

  console.log(connectionId);
  if (!connectionId) {
    return;
  }

  const command = new PostToConnectionCommand({
    ConnectionId: connectionId,
    Data: JSON.stringify({
      type: "game-state",
      data: gameEntry,
    }),
  });

  await client.send(command);
};

//TODO change so that game logic takes into account that turn is a bool now.
export const handler = async (event) => {
  //1. Select the correct game state
  console.log("Handler called");
  const { uuid, row, column } = JSON.parse(event.body);
  console.log("body parsed");
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

  if (gameEntry === null) {
    console.error("No game found");
    return {
      statusCode: 404,
      error: "No game with matching url found",
    };
  }

  //2. Try the move using gameLogic. If the move is valid, insert the new game state into the database. Send a positive response.
  const gameState = {
    squareData: stringToSquares(gameEntry.SquareData),
    turn: gameEntry.BlackTurn ? "black" : "white",
    placedColor: gameEntry.BlackId === uuid ? "black" : "white",
  };
  console.log("gameState constructed", gameState);
  const gameLogic = new GameLogic(Math.sqrt(gameState.squareData.length));
  const newSquareData = gameLogic.executeMove(gameState, row, column);
  console.log("Move executed");
  //3. If the move was invalid, send an error response.
  if (newSquareData === null) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Illegal move" }),
    };
  }

  const squareString = squaresToString(newSquareData);
  console.log("Square string reconstructed");

  //TODO make query, notify opponent (sending the entire game state at once)
  const newGameData = await updateGameData(
    gameEntry.GameId,
    squareString,
    !gameEntry.BlackTurn
  );
  console.log("db updated");

  try {
    await notifyOpponent(event, newGameData);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      error: error,
    };
  }
  console.log("Successfully notified opponent");
  return {
    statusCode: 200,
  };
};
