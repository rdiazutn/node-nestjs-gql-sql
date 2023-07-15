import { GraphqlApplicationContext } from 'src/users/security/GraphqlApplicationContext'
import { Salesman } from '../../models/Salesman.entity'
import * as DataLoader from 'dataloader'

export type SalesModuleContext = GraphqlApplicationContext & {
  // 2. Loader instructionsAdd newly created loaders here
  salesmanLoader: DataLoader<number, Salesman[]>
}
