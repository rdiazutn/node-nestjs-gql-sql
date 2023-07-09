import { GraphQLExecutionContext } from '@nestjs/graphql'
import { User } from '../models/User.entity'

export type GraphqlApplicationContext = GraphQLExecutionContext & {
  user: User
}
