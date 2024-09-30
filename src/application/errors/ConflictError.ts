import { AppError } from './AppError'

export class ConflictError extends AppError {
  constructor(message = 'Conflict: Resource already exists or is in conflict.') {
    super(message, 409)
    this.name = 'ConflictError'
  }
}