const dotenv = require('dotenv')
dotenv.config()
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { buildSchema } from 'type-graphql'
import express from 'express';
import http from 'http';
import { UserResolver } from './resolvers/UserResolver'
import BranchResolver from './resolvers/BranchResolver'
import { json } from 'body-parser'
import { AppDataSource } from './data-source'
import { User } from './models/User'
import { Branch } from './models/Branch'
import { Salesman } from './models/Salesman'
import cookieParser from 'cookie-parser'
import SetUser from './middlewares/SetUser'
import Context from './types/global/Context'

async function main(){
  // Start TYPEORM data source
  await AppDataSource.initialize().then(async () => {
    await insertDummyData()
  })

  // Setup Apollo Server
  // TODO: autoimport from resolvers
  const schema = await buildSchema({
    resolvers: [UserResolver, BranchResolver],
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

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log('Server has started!')
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
