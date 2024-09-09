/**
 * Get the correct body, for a 200 ok response
 * @param data string message or JSON object.
 * @param headers HTTP headers
 */
export const getOkResponse = (data: any, headers?: any) => {
  const body: any = getOkBody(data);

  headers = {
    ...headers,
  };
  return {
    statusCode: 200,
    headers,
    body,
  } as Response;
};

/**
 * Stringify JSON data.
 * @param data
 */
const getOkBody = (data: any) => {
  return typeof data === 'string' ? data : JSON.stringify(data);
};

/**
 * Get the correct body, for a !200 fault response.
 * @param statusCode 401, 403, 500
 * @param faults array of errors
 * @param headers HTTP headers
 */
export const getFaultResponse = (
  statusCode: number,
  faults: Fault[],
  message?: string,
  headers?: any
) => {

  const body: any = {
    compositeFault: { faults: faults },
    message
  };

  headers = {
    ...headers,
  };
  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  } as Response;
};

export const getInternalServerFault = () => {
  return [{ faultCode: -1, explanationText: 'Internal server error' }];
};


export const getUnauthorizedRequestFault = () => {
  return [{ faultCode: -1, explanationText: 'No permission to access this endpoint.' }];
};

export interface Fault {
  faultCode: number;
  explanationText?: string;
  paramValues?: { param: string; value: string }[];
}

export interface Response {
  statusCode: number;
  headers: any;
  body: string;
}
