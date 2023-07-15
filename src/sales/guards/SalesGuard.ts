import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { User } from 'src/users/models/User.entity'
import { verifyJwt } from 'src/users/security/Jwt'
import { createSalesmanLoader } from '../loaders/SalesmanLoader'
import { SalesModuleContext } from '../overrides/SalesModuleContext'

@Injectable()
export class SalesGuard implements CanActivate {
  async canActivate(fullContext: ExecutionContext) {
    const context = fullContext
      .getArgs()
      .find((arg) => arg?.req) as SalesModuleContext
    if (!context) {
      throw new Error('Request OBJECT not found')
    }
    // Add newly created loaders here
    context.salesmanLoader = createSalesmanLoader()
    return true
  }
}
