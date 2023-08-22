export const handler = async (event) => {
  console.log("Disconnected, id:", event.requestContext.connectionId);
  return {
    statusCode: 200,
  };
};
