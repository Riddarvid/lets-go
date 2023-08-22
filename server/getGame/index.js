import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

//DB connection outside handler for sharing
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const getGameFromDb = async (uuid) => {
  const command = new QueryCommand({
    TableName: process.env.TABLE,
    IndexName: "BlackId-index",
    KeyConditionExpression: "BlackId = :id",
    ExpressionAttributeValues: {
      ":id": uuid,
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};

export const handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log(body);

  const game = await getGameFromDb(body.uuid);

  //Establish callback url
  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const callbackUrl = `https://${domain}/${stage}`; //Same api as message was received from.
  const client = new ApiGatewayManagementApiClient({ endpoint: callbackUrl });

  const command = new PostToConnectionCommand({
    ConnectionId: event.requestContext.connectionId, //Send back to sender
    Data: JSON.stringify({
      type: "game-state",
      data: game,
    }),
  });

  try {
    await client.send(command);
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
  console.log("Success!");
  return {
    statusCode: 200,
  };
};
