const dynamoDBService = require("../../../service/aws/dynamoDb");

exports.handler = async (event) => {

  try {
    const data = await dynamoDBService.readAllItens(
      process.env.NOTES_TABLE
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ message: data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: event }),
    };
  }
};
