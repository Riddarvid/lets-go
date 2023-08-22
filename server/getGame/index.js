import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

export const handler = async (event, context) => {
  console.log("Message received");
  console.log(event);
  //Establish callback url
  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const callbackUrl = `https://${domain}/${stage}`; //Same url as message was received from.
  const client = new ApiGatewayManagementApiClient({ endpoint: callbackUrl });
  console.log("Callback URL:", callbackUrl);

  const connectionId = event.requestContext.connectionId;
  console.log("Connection id:", connectionId);

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
