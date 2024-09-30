export class BadRequestError extends Error {
  public statusCode
  constructor(message = 'Bad Request: Invalid or missing parameters.') {
    super(message)
    this.name = 'BadRequestError'
    this.statusCode = 400
  }
}