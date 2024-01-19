const dynamoDBService = require("../../../service/aws/dynamoDb");

exports.handler = async (event) => {
  const id = event.pathParameters.id;

  try {
    const data = await dynamoDBService.readItem('5abd3242-688c-4a87-baf1-c1c75ec57356', process.env.NOTES_TABLE);
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
