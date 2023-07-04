import dotenv from 'dotenv'
dotenv.config()
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { buildSchema } from 'type-graphql'
import express from 'express'
import http from 'http'
import { UserResolver } from './modules/users/resolvers/UserResolver'
import BranchResolver from './modules/sales/resolvers/BranchResolver'
import { json } from 'body-parser'
import { AppDataSource } from './data-source'
import { User } from './modules/users/models/User'
import { Salesman } from './modules/sales/models/Salesman'
import cookieParser from 'cookie-parser'
import SetUser from './middlewares/SetUser'
import Context from './types/global/Context'
import { AuthorizationChecker } from './middlewares/AuthorizationChecker'
import { Roles } from './security/Roles'
import { Branch } from './modules/sales/models/Branch'

async function main(){
  // Start TYPEORM data source
  await AppDataSource.initialize().then(async () => {
    await insertDummyData()
  })

  // Setup Apollo Server
  // TODO: autoimport from resolvers
  const schema = await buildSchema({
    resolvers: [UserResolver, BranchResolver],
    authChecker: AuthorizationChecker
  })
  const server = new ApolloServer<Context>({
    schema
  })

  // Start express server
  const app = express()
  const httpServer = http.createServer(app)
  await server.start()
  
  app.use('/graphql',
    json(),
    cookieParser(),
    expressMiddleware(server, {
      context: context => SetUser(context),
    }),
  )

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log('\x1b[46m                   \x1b[0m')
  console.log('\x1b[92m Server has started! \x1b[0m')
  console.log('\x1b[46m                   \x1b[0m')
}

main()
const insertDummyData = async () => {
  // TODO DELETE THIS
  console.log('Inserting dummy data')
  // --
  const existingUser = await User.findOneBy({ username: 'rdiaz' })
  if (!existingUser) {
    const user = new User()
    user.username = 'rdiaz'
    user.password = '1234'
    user.role = Roles.ADMIN
    await user.save()
  }
  // --
  const branch = new Branch()
  branch.code = '001'
  branch.name = 'Branch 1'
  await AppDataSource.manager.save(branch)
  // --
  const salesman = new Salesman()
  salesman.name = 'Salesman 1'
  salesman.branch = branch
  await AppDataSource.manager.save(salesman)
}
