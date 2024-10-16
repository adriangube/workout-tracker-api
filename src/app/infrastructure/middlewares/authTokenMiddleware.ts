import { ForbiddenError } from '@/app/application/errors/ForbiddenError'
import { UnauthorizedError } from '@/app/application/errors/UnauthorizedError'
import { config } from '@/app/config/index'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError())
  }
  const token = authHeader.split(' ')[1]
  if (!token) {
    return next(new UnauthorizedError())
  }
  try {
    const decoded = jwt.verify(token, config.SECRET as string) as  { id: string, userName: string }
    req.session = { ...req.session, user: decoded }
    next()
  } catch {
    return next(new ForbiddenError())
  }
}
