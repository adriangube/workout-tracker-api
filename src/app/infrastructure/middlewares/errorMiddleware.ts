import { Request, Response, NextFunction } from 'express'

interface CustomError extends Error {
  statusCode?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err?.stack)
  const statusCode = err?.statusCode ?? 500
  res.status(statusCode).send({
    status: 'error',
    code: statusCode,
    message: err.message ?? 'Internal Server Error'
  })
}