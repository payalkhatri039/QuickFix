interface ICallApi {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  credentials?: RequestCredentials;
  mode?: RequestMode;
  headers: any;
  body?: any;
  ttl?: number;
  disableFlavour?: boolean;
}

/**
 *
 * @param param : ICallApi
 * @returns response from API
 *
 * @description
 * callApi is a inhouse generic function which can be used as
 * a replacement for axios. This function takes various params
 * which include
 *  1. path -> On which api needs to be called
 *  2. method -> Type of method. method takes 'GET' 'POST' 'PUT' 'DELETE'
 *  3. headers -> Request headers
 *  4. body -> Request body if the method is 'POST' 'PUT' or 'PATCH'
 *
 * callApi aborts the call if the API response is taking more than 5 seconds
 * with proper error message.
 */

export async function callApi<T = any>({
  path,
  method,
  body = {},
  headers,
  mode = 'cors'
}: ICallApi): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  let response: Response;
  try {
    response = await fetch(path, {
      signal: controller.signal,
      method,
      headers,
      body: method !== 'GET' ? JSON.stringify(body) : null,
      mode
    });
    clearTimeout(timeoutId);
    const responseData = await response.json();
    responseData.statusCode = response.status;
    return responseData;
  } catch (error) {
    clearTimeout(timeoutId);
    let errormsg = 'Something went wrong. Please try again.';
    if (error && error.toString().includes('Aborted')) {
      errormsg =
        'Sorry, it is unusually taking longer than expected. Please try again';
    } else if (error?.toString().includes('NETERR')) {
      errormsg = 'Sorry, there seems to be a connection error. Please retry';
    }
    const errorresponse: any = {
      response: '',
      error: errormsg,
      statusCode: response?.status || 504
    };
    return errorresponse;
  }
}
