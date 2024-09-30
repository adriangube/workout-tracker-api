import { AppError } from './AppError'

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request: Invalid or missing parameters.') {
    super(message, 400)
    this.name = 'BadRequestError'
  }
}