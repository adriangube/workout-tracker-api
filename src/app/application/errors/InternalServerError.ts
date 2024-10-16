import { AppError } from './AppError'

export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error: Something went wrong on our end.') {
    super(message, 500)
    this.name = 'InternalServerError'
  }
}