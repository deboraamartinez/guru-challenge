const dynamoDBService = require("../../../service/aws/dynamoDb");
const { v4: uuidv4 } = require('uuid');


exports.handler = async (event) => {

  const data = JSON.parse(event.body);

  try {
    const data = {
      id: uuidv4(),
      title: data.title,
      content: data.content,
    };
    await dynamoDBService.createItem(data, process.env.NOTES_TABLE);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Note created" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
