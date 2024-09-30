export class InternalServerError extends Error {
  public statusCode
  constructor(message = 'Internal Server Error: Something went wrong on our end.') {
    super(message)
    this.name = 'InternalServerError'
    this.statusCode = 500
  }
}