export class ConflictError extends Error {
  public statusCode
  constructor(message = 'Conflict: Resource already exists or is in conflict.') {
    super(message)
    this.name = 'ConflictError'
    this.statusCode = 409
  }
}