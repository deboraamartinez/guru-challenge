const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  PutCommand,
  DynamoDBDocumentClient,
  DeleteCommand,
  GetCommand
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

class DynamoDBService {
  async readItem(id, table) {
    try {
      const command = new GetCommand({
        TableName: table,
        Key: {
          id: id,
        },
      });
      const result = await docClient.send(command);
      return result.Item;
    } catch (error) {
      throw error;
    }
  }

  async createItem(data, table) {
    try {
      const command = new PutCommand({
        TableName: table,
        Item: {
          id: data.id,
          title: data.title,
          content: data.content,
        },
      });
      await docClient.send(command);
    } catch (error) {
      throw error;
    }
  }

  async deleteItem(id, table) {
    try {
      const command = new DeleteCommand({
        TableName: table,
        Key: {
          id: id,
        },
      });
      return await docClient.send(command);
    } catch (error) {
      throw error;
    }
  }

  async updateItem(id, data, table) {
    try {
      const params = {
        TableName: table,
        Item: {
          id: id,
          content: data,
        },
      };
      await dynamoDB.update(params).promise();
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new DynamoDBService();
