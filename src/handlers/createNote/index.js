const dynamoDBService = require("../../../service/aws/dynamoDb");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const noteSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const { error } = noteSchema.validate(data);
  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid data", details: error.details }),
    };
  }

  try {
    const database = {
      id: uuidv4(),
      title: data.title,
      content: data.content,
    };
    await dynamoDBService.createItem(database, process.env.NOTES_TABLE);
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
