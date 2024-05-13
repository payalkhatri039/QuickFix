export default class QuickFixError extends Error {
  code: number;
  httpCode: number;
  constructor(errorInfo) {
    const {
      message = "error",
      code = "",
      clientMsg = "",
      httpCode = 400,
    } = errorInfo;
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, QuickFixError);
    }
    this.name = "Quick Fix Error";
    this.code = code;
    this.message = clientMsg;
    this.httpCode = httpCode;
  }
}
