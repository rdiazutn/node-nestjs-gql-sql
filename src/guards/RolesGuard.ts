import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { User } from 'src/users/models/User.entity'
import { verifyJwt } from 'src/users/security/Jwt'

@Injectable()
export class RolesGuard implements CanActivate {
  private roles: string[]
  // TODO accept multiple ways of roles
  constructor(roles: string[]) {
    this.roles = roles
  }

  canActivate(fullContext: ExecutionContext) {
    if (this.roles.length === 0) {
      return true
    }
    const context = fullContext.getArgs().find((arg) => arg?.req)
    const cookies = context.req.cookies
    const accessToken = cookies['accessToken']
    const user = verifyJwt<User>(accessToken)
    return this.roles.includes(user.role)
  }
}
