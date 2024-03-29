const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  PutCommand,
  DynamoDBDocumentClient,
  DeleteCommand,
  GetCommand,
  UpdateCommand,
  ScanCommand,
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

  async readAllItens(table) {
    try {
      const command = new ScanCommand({
        TableName: table,
      });
      const result = await docClient.send(command);
      return result.Items;
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

  async updateItem(data, id, table) {
    try {
      const command = new UpdateCommand({
        TableName: table,
        Key: {
          id: id,
        },
        UpdateExpression: "set content = :content, title = :title",
        ExpressionAttributeValues: {
          ":content": data.content,
          ":title": data.title,
        },
        ReturnValues: "ALL_NEW",
      });
      const result = await docClient.send(command);
      return result.Item;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new DynamoDBService();
