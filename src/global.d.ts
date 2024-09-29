export {}

declare global {
  namespace Express {
    export interface Request {
      session?: {
        user?: {
          id: string,
          userName: string
        }
      }
      // extra variables you want to use in req object
    }
  }

}