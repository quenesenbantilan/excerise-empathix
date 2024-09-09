import { APIGatewayEvent, Context } from 'aws-lambda';
import * as resp from '../aws/response';
import { deleteEmpathixById } from '../utilities/dynamoDbQueryWrappers';

export const deleteEmpathix = async (event: APIGatewayEvent, context: Context) => {

  const id = event.pathParameters?.id ?? '';

  let response: resp.Response;

  try {
    console.log(event, context);

    const result = await deleteEmpathixById(id);
    response = resp.getOkResponse(result);

    return response;
  } catch (error) {
    response = resp.getFaultResponse(500, resp.getInternalServerFault(), undefined);
    console.log({
      message: `Error encountered with ${event.httpMethod} ${event.path} request`,
      error,
      response,
    });
    return response;
  }
};