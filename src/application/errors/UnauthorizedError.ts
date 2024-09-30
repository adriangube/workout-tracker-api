export class UnauthorizedError extends Error {
  public statusCode
  constructor(message = 'Unauthorized: Authentication is required.') {
    super(message)
    this.name = 'UnauthorizedError'
    this.statusCode = 401
  }
}