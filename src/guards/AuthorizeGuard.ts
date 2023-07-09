import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { User } from 'src/users/models/User.entity'
import { verifyJwt } from 'src/users/security/Jwt'
import { Inject } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async canActivate(fullContext: ExecutionContext) {
    const context = fullContext.getArgs().find((arg) => arg?.req)
    if (!context) {
      throw new Error('Request OBJECT not found')
    }
    if (!context.req.cookies) {
      return false
    }
    const cookies = context.req.cookies
    const accessToken = cookies['accessToken']
    if (!accessToken) {
      return false
    }
    verifyJwt<User>(accessToken)
    context.user = await this.cacheManager.get(accessToken)
    return true
  }
}
