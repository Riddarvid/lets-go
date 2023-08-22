import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

//DB connection outside handler for sharing
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const getGameFromDb = () => {};

export const handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log(body);

  //const game = getGameFromDb(uuid);

  //Establish callback url
  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const callbackUrl = `https://${domain}/${stage}`; //Same api as message was received from.
  const client = new ApiGatewayManagementApiClient({ endpoint: callbackUrl });

  const command = new PostToConnectionCommand({
    ConnectionId: event.requestContext.connectionId, //Send back to sender
    Data: `Tjenare på dig, verkar som att du skrev: ${event.body}`,
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
