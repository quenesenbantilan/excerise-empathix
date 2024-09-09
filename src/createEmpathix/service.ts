import * as crypto from 'crypto';
import { putItem } from '../aws/dynamodb';
import { Empathix, EmpathixRequest } from "../interfaces/Empathix";

export const createEmpathix = async (empathixRequest: EmpathixRequest) => {
  const empathix = createDBEntry(empathixRequest);
  const result = await insertEmapthix(empathix);
  return result;
}

export const createDBEntry = (empathixRequest: EmpathixRequest) => {
  const empathix: Empathix = {
    ...empathixRequest,
    created: new Date(Date.now()).toISOString(), // Note: use Date.now for stubbing test case,
    id: generateId()
  }
  return empathix;
}

export const insertEmapthix = async (empathix: Empathix) => {
  const empathixTableName = process.env.empathixTable || '';
  const tableName = empathixTableName
  await putItem(empathix, tableName);
  return 'OK'
}

export const generateId = (): string => {
  return crypto.randomBytes(8).toString('hex')
}
