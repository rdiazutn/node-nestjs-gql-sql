import { Module } from '@nestjs/common'
import { UserResolver } from './resolvers/UserResolver'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import UserService from './services/UserService'
import { join } from 'path'

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
  providers: [UserResolver, UserService],
})
export class UsersModule {}
