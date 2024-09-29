import { config } from '@config/index'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'No token provided' })
  }
  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).send({ message: 'No token provided' })
  }
  try {
    const decoded = jwt.verify(token, config.SECRET as string) as  { id: string, userName: string }
    req.session = { ...req.session, user: decoded }
    next()
  } catch (e) {
    console.error(e)
    return res.status(403).json({ error: 'Invalid token' })

  }
}
