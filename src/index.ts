const dotenv = require('dotenv')
dotenv.config()
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'

import { AppDataSource } from './data-source'
import { User } from './models/User'
import { UserResolver } from './resolvers/UserResolver'
import { Salesman } from './models/Salesman'
import { Branch } from './models/Branch'
import BranchResolver from './resolvers/BranchResolver'

async function main(){
  await AppDataSource.initialize().then(async () => {
    // TODO DELETE THIS
    console.log('Inserting dummy data')
    // --
    User.find().then((users) => {
      if (users.length === 0 ){
        const user = new User()
        user.username = 'rdiaz'
        user.password = '1234'
        user.save()
      }
    })
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


    console.log('Here you can setup and run express / fastify / any other framework.')

  }).catch(error => console.log(error))

  // TODO: autoimport from resolvers
  const schema = await buildSchema({
    resolvers: [UserResolver, BranchResolver],
  })

  const server = new ApolloServer({
    schema
  })
  await server.listen(process.env.PORT || 4000)
  console.log('Server has started!')
}

main()
