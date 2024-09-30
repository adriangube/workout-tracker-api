export class UnprocessableEntityError extends Error {
  public statusCode
  constructor(message = 'Unprocessable Entity: The data provided is invalid.') {
    super(message)
    this.name = 'UnprocessableEntityError'
    this.statusCode = 422
  }
}