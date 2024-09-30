export class NotFoundError extends Error {
  public statusCode
  constructor(message = 'Not Found: The requested resource does not exist.') {
    super(message)
    this.name = 'NotFoundError'
    this.statusCode = 404
  }
}