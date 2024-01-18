const dynamoDBService = require("../../../service/aws/dynamoDb");
const Joi = require("joi");

const noteSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  const id = event.pathParameters.id;

  const { error } = noteSchema.validate(data);
  

  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid data", details: error.details }),
    };
  }

  try {
    await dynamoDBService.updateItem(data, id, process.env.NOTES_TABLE);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Note updated" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
