import { AppError } from './AppError'

export class TooManyRequestsError extends AppError {
  constructor(message = 'Too Many Requests: You have exceeded the rate limit.') {
    super(message, 429)
    this.name = 'TooManyRequestsError'
  }
}