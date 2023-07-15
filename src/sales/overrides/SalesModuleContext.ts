import { GraphqlApplicationContext } from 'src/users/security/GraphqlApplicationContext'
import { Salesman } from '../models/Salesman.entity'
import * as DataLoader from 'dataloader'

export type SalesModuleContext = GraphqlApplicationContext & {
  salesmanLoader: DataLoader<number, Salesman[]>
}
