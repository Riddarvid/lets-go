export const handler = async (event) => {
  console.log("New connection, id:", event.requestContext.connectionId);
  return {
    statusCode: 200,
  };
};
