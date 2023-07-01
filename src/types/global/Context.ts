import { Request, Response } from 'express'
import { User } from '../../models/User'
interface Context {
  req: Request;
  res: Response;
  user: User | null;
  token: string | null;
}

export default Context
