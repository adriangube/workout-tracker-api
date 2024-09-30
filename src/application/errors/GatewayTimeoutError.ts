export class GatewayTimeoutError extends Error {
  public statusCode
  constructor(message = 'Gateway Timeout: The server took too long to respond.') {
    super(message)
    this.name = 'GatewayTimeoutError'
    this.statusCode = 404
  }
}