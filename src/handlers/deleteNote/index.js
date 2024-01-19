const dynamoDBService = require("../../../service/aws/dynamoDb");

exports.handler = async (event) => {
  const id = event.pathParameters.id;

  try {
    await dynamoDBService.deleteItem(id, process.env.NOTES_TABLE);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Note deleted" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: event }),
    };
  }
};
