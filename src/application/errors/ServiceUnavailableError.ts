import { AppError } from './AppError'

export class ServiceUnavailableError extends AppError {
  constructor(message = 'Service Unavailable: The server is temporarily down. Please try again later.') {
    super(message, 503)
    this.name = 'ServiceUnavailableError'
  }
}