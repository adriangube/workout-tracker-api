import { AppError } from './AppError'

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized: Authentication is required.') {
    super(message, 401)
    this.name = 'UnauthorizedError'
  }
}