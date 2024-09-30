import { AppError } from './AppError'

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden: You do not have permission to access this resource.') {
    super(message, 403)
    this.name = 'ForbiddenError'
  }
}