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

async function main(){
  // await AppDataSource.initialize().then(async () => {
  //   // TODO DELETE THIS
  //   console.log('Inserting dummy data')
  //   // --
  //   const existingUser = await User.findOneBy({ username: 'rdiaz' })
  //   if (!existingUser) {
  //       const user = new User()
  //       user.username = 'rdiaz'
  //       user.password = '1234'
  //       await user.save()
  //   }
  //   // --
  //   const branch = new Branch()
  //   branch.code = '001'
  //   branch.name = 'Branch 1'
  //   await AppDataSource.manager.save(branch)
  //   // --
  //   const salesman = new Salesman()
  //   salesman.name = 'Salesman 1'
  //   salesman.branch = branch
  //   await AppDataSource.manager.save(salesman)


  //   console.log('Here you can setup and run express / fastify / any other framework.')

  // }).catch(error => console.log(error))

  // TODO: autoimport from resolvers
  const schema = await buildSchema({
    resolvers: [UserResolver, BranchResolver],
  })

  // const contextMiddlewares = [CookieParser, SetUser]

  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema
  })

  await server.start()
  app.use('/graphql',
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  )
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log('Server has started!')
}

main()
