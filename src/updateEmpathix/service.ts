import { putItem } from "../aws/dynamodb";
import { EmpathixRequest } from "../interfaces/Empathix";

export const updateEmpathix = async (empathixRequest: EmpathixRequest, id: string,) => {
  const query = { ...empathixRequest, id, updated: new Date(Date.now()).toISOString() };

  const result = await overwriteEmpathix(query);
  return result;
}

export const overwriteEmpathix = async (query: AWS.DynamoDB.DocumentClient.PutItemInputAttributeMap) => {
  const env = process.env;
  const tableName = env.empathixTable || '';

  try {
    await putItem(query, tableName, 'attribute_exists(id)');
    return 'ok';
  } catch (ex: any) {
    if (ex.name === 'ConditionalCheckFailedException') {
      throw ex
    }
  }
}