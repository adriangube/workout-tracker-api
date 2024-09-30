import { AppError } from './AppError'

export class NotFoundError extends AppError {
  constructor(message = 'Not Found: The requested resource does not exist.') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}