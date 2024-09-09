import { AWS } from './aws';


export const dynamodb = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });

/**
 * generic function to get an item from a dynamoDb table of interest
 * @param primaryKey the primary Key of the item to get
 * @param tableName the name of the table of interest
 * @param db override db lib, used for testing purposes
 */
export const getItem = async (primaryKey: object, tableName: string, db: AWS.DynamoDB.DocumentClient = dynamodb) => {
  const Key = { ...primaryKey };
  const params = {
    Key,
    TableName: tableName,
  } as AWS.DynamoDB.DocumentClient.GetItemInput;

  const output = (await db.get(params).promise()) as any;
  return output?.Item;
};

/**
 * putItem
 * @param item
 * @param tableName the name of the table of interest
 * @returns Promise, a thenable Promise object
 */
export const putItem = (
  item: AWS.DynamoDB.DocumentClient.PutItemInputAttributeMap,
  tableName: string,
  _conditionExpression = 'attribute_not_exists(id)',
  db: AWS.DynamoDB.DocumentClient = dynamodb
): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> => {
  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: tableName,
    ReturnItemCollectionMetrics: 'SIZE',
    Item: {
      ...item,
    },
    ConditionExpression: _conditionExpression
  };

  return db.put(params).promise();
}

export const updateItem = (query: AWS.DynamoDB.DocumentClient.UpdateItemInput,
  _conditionExpression = 'attribute_not_exists(id)',
  db: AWS.DynamoDB.DocumentClient = dynamodb): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> => {

  const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
    ...query,
    ConditionExpression: _conditionExpression,
    ReturnValues: 'UPDATED_NEW'
  }

  return db.update(params).promise();
};