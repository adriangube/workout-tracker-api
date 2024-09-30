export class ServiceUnavailableError extends Error {
  public statusCode
  constructor(message = 'Service Unavailable: The server is temporarily down. Please try again later.') {
    super(message)
    this.name = 'ServiceUnavailableError'
    this.statusCode = 503
  }
}