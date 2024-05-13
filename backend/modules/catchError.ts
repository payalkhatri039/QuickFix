/**
 *
 * @param fnc
 * @returns
 * a wrapper function that catches error and return a generic
 * obj for it.
 */
export const catchError = (fnc) => {
  return async function (req, res, next) {
    try {
      await fnc(req, res, next);
    } catch (err) {
      console.log('Error : ', err);
      const {
        message = 'error',
        code = 400,
        clientMsg = 'Something went wrong',
        httpCode = 400
      } = err;
      res.status(httpCode).send({
        status: 'FAILURE',
        code: 400,
        error: {
          message
        },
        response: {}
      });
    }
  };
};
