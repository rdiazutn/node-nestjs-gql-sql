import { Module } from '@nestjs/common'
import { BranchResolver } from './resolvers/BranchResolver'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { BranchService } from './services/BranchService'
import { SalesmanService } from './services/SalesmanService'
import { SalesmanResolver } from './resolvers/SalesmanResolver'
import { SalesLoaderGuard } from './loaders/guards/SalesLoaderGuard'
import { APP_GUARD } from '@nestjs/core'
import { ComplexityPlugin } from 'src/plugins/ComplexityPlugin'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      sortSchema: true,
      // NEED TO ALWAYS HAVE THE SAME CONTEXT ON EVERY MODULE
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SalesLoaderGuard,
    },
    ComplexityPlugin,
    SalesmanResolver,
    BranchResolver,
    BranchService,
    SalesmanService,
  ],
})
export class SalesModule {}
