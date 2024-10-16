import { AppError } from './AppError'

export class GatewayTimeoutError extends AppError {
  constructor(message = 'Gateway Timeout: The server took too long to respond.') {
    super(message, 404)
    this.name = 'GatewayTimeoutError'
  }
}