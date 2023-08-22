import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

export const handler = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    body = event.body;
  }
  console.log("Default route invoked. Body: ", body);

  //Establish callback url
  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const callbackUrl = `https://${domain}/${stage}`; //Same api as message was received from.
  const client = new ApiGatewayManagementApiClient({ endpoint: callbackUrl });

  const command = new PostToConnectionCommand({
    ConnectionId: event.requestContext.connectionId, //Send back to sender
    Data: JSON.stringify({
      response: `Unrecognized action: ${body?.action}`,
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
  return {
    statusCode: 200,
  };
};
