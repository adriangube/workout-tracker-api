export class ForbiddenError extends Error {
  public statusCode
  constructor(message = 'Forbidden: You do not have permission to access this resource.') {
    super(message)
    this.name = 'ForbiddenError'
    this.statusCode = 403
  }
}