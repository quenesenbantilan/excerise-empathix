import { APIGatewayEvent, Context } from 'aws-lambda';
import * as resp from '../aws/response';
import * as service from './service';

export const updateEmpathix = async (event: APIGatewayEvent, context: Context) => {
  try {
    console.log(event, context);

    const empathix = JSON.parse(event.body as string);
    const id = event.pathParameters?.id ?? '';

    const result = await service.updateEmpathix(empathix, id);
    const response = resp.getOkResponse(result);

    return response;
  } catch (error) {
    const response = resp.getFaultResponse(500, resp.getInternalServerFault(), undefined);
    console.log({
      message: `Error encountered with ${event.httpMethod} ${event.path} request`,
      error,
      response,
    });
    return response;
  }

}