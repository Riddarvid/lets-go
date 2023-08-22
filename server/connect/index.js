export const handler = async (event, context) => {
  console.log("New connection, id:", event.requestContext.connectionId);
  return {
    statusCode: 200,
  };
};
