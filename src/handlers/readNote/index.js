const dynamoDBService = require("../../../service/aws/dynamoDb");

exports.handler = async (event) => {
  const id = JSON.parse(event.pathParameters.id);

  try {
    const data = await dynamoDBService.readItem(id, process.env.NOTES_TABLE);
    console.log(data)
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
