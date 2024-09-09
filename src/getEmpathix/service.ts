
import { Empathix } from '../interfaces/Empathix';
import { getEmpathixById } from '../utilities/dynamoDbQueryWrappers';

export const getEmpathix = async (id: string) => {
  const empathixDetail = await getEmpathixById(id) as Empathix;

  return empathixDetail
};
