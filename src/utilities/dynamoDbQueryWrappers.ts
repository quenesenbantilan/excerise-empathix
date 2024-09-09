import * as db from '../aws/dynamodb';
import { Empathix } from '../interfaces/Empathix';

export const getEmpathixById = async (id: string): Promise<Empathix | undefined> => {
  const empathixTableName = process.env.empathixTable || '';
  return await db.getItem({ id }, empathixTableName) as Empathix
}

export const deleteEmpathixById = async (id: string): Promise<any> => {
  try {
    const query = {
      TableName: process.env.empathixTable || '',
      Key: {
        id
      },
      UpdateExpression: 'SET #deleted = :deleted, #ttl = :ttl',
      ExpressionAttributeNames: {
        '#deleted': 'deleted',
        '#ttl': 'ttl',
      },
      ExpressionAttributeValues: {
        ':deleted': new Date(Date.now()).toISOString(),
      },
      ConditionExpression: 'attribute_exists(id)'
    };


    await db.updateItem(query);

    return 'Ok';
  } catch (ex: any) {
    if (ex.name === 'ConditionalCheckFailedException') {
      throw ex
    }
  }
}
