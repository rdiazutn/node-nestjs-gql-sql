import Context from '../types/global/Context'
import { User } from '../models/User'
import { verifyJwt } from '../security/Jwt'

const SetUser =  (ctx)=> {
  const context  = ctx as Context
  console.log('----SetUser---')
  const accessToken = context.req.cookies?.accessToken
  if (accessToken) {
    const user = verifyJwt<User>(accessToken)
    context.user = user
  }
  return context
}

export default SetUser