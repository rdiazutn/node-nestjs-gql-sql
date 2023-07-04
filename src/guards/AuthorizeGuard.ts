import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from 'src/users/models/User.entity';
import { verifyJwt } from 'src/users/security/Jwt';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  canActivate(fullContext: ExecutionContext) {
    const context = fullContext.getArgs().find((arg) => arg?.req);
    if (!context) {
      throw new Error('Request OBJECT not found');
    }
    if (!context.req.cookies) {
      return false;
    }
    const cookies = context.req.cookies;
    const accessToken = cookies['accessToken'];
    if (!accessToken) {
      return false;
    }
    const user = verifyJwt<User>(accessToken);
    // TODO: check from redis
    context.user = user;
    return true;
  }
}
