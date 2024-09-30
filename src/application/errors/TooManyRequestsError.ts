export class TooManyRequestsError extends Error {
  public statusCode
  constructor(message = 'Too Many Requests: You have exceeded the rate limit.') {
    super(message)
    this.name = 'TooManyRequestsError'
    this.statusCode = 429
  }
}