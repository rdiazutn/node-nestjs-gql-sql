import { Module } from '@nestjs/common'
import { BranchResolver } from './resolvers/BranchResolver'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { BranchService } from './services/BranchService'
import { SalesmanService } from './services/SalesmanService'
import { SalesmanResolver } from './resolvers/SalesmanResolver'

// TODO: add global guard
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  providers: [SalesmanResolver, BranchResolver, BranchService, SalesmanService],
})
export class SalesModule {}
