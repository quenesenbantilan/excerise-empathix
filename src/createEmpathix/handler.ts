import { APIGatewayEvent } from 'aws-lambda';
import * as resp from '../aws/response';
import * as service from './service';

export const createEmpathix = async (event: APIGatewayEvent) => {

  let response: resp.Response;

  try {
    const empathix = JSON.parse(event.body as string);

    const result = await service.createEmpathix(empathix);
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

