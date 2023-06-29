const dotenv = require('dotenv')
dotenv.config()
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'

import { AppDataSource } from './data-source'
import { User } from './models/User'
import { UserResolver } from './resolvers/UserResolver'

async function main(){
  await AppDataSource.initialize().then(async () => {
    // TODO DELETE THIS
    console.log('Inserting a new user into the database...')
    const user = new User()
    user.firstName = 'Timber'
    user.lastName = 'Saw'
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log('Saved a new user with id: ' + user.id)

    console.log('Loading users from the database...')
    const users = await AppDataSource.manager.find(User)
    console.log('Loaded users: ', users)

    console.log('Here you can setup and run express / fastify / any other framework.')

  }).catch(error => console.log(error))

  const schema = await buildSchema({
    resolvers: [UserResolver]
  })
  const server = new ApolloServer({ schema })
  await server.listen(process.env.PORT || 4000)
  console.log('Server has started!')
}

main()
