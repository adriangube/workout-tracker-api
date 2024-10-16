import { AppError } from './AppError'

export class UnprocessableEntityError extends AppError {
  constructor(message = 'Unprocessable Entity: The data provided is invalid.') {
    super(message, 422)
    this.name = 'UnprocessableEntityError'
  }
}