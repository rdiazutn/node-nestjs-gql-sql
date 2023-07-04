import { AuthCheckerInterface, ResolverData } from 'type-graphql'
import Context from '../types/global/Context'
import { User } from '../modules/users/models/User'

export class AuthorizationChecker implements AuthCheckerInterface<Context> {
  async check({ root, args, context, info }: ResolverData<Context>, roles: string[]) {
    // get user
    if (!context.token || !context.user) {
      return false
    }
    const token = context.token
    // TODO ADD REDIS CACHE
    const existingUser = await User.findOneBy({ token })
    if (!existingUser) {
      return false
    }
    console.log (existingUser, roles)
    if (roles.length !== 0 && !roles.includes(existingUser.role)) {
      return false
    }
    
    return true
  }
}
