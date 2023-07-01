import Context from '../types/global/Context'
import { User } from '../models/User'
import { verifyJwt } from '../security/Jwt'

const SetUser =  (ctx: any, ..._args): Promise<Context> => {
  const context  = ctx as Context
  const accessToken = context.req.cookies?.accessToken
  if (accessToken) {
    const user = verifyJwt<User>(accessToken)
    context.user = user
    context.token = accessToken
  }
  return Promise.resolve(context)
}

export default SetUser