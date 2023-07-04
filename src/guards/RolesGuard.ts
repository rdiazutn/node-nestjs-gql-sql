import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  private roles: string[];
  // TODO accept multiple ways of roles
  constructor(roles: string[]) {
    this.roles = roles;
  }
  canActivate(context: ExecutionContext) {
    console.log({ roles: this.roles });
    return true;
  }
}
