import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import * as resp from '../aws/response';
import * as service from './service';

export const getEmpathix = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

  const id = event.pathParameters?.id as string;

  let response: resp.Response;

  try {
    console.log(context)

    const result = await service.getEmpathix(id);

    const response = resp.getOkResponse(result);

    const body = JSON.parse(response.body);

    console.log({
      message: `${event.httpMethod} ${event.path} response - statusCode: ${response.statusCode}`,
      response: { ...response, body },
    });

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
