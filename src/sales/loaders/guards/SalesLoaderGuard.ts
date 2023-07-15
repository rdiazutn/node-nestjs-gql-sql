import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { createSalesmanLoader } from '../SalesmanLoader'
import { SalesModuleContext } from '../overrides/SalesModuleContext'

@Injectable()
export class SalesLoaderGuard implements CanActivate {
  async canActivate(fullContext: ExecutionContext) {
    const context = fullContext
      .getArgs()
      .find((arg) => arg?.req) as SalesModuleContext
    if (!context) {
      throw new Error('Request OBJECT not found')
    }
    // 3.Loader instructions: Add newly created loaders here
    context.salesmanLoader = createSalesmanLoader()
    return true
  }
}
