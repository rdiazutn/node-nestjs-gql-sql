import { Resolver, Query } from 'type-graphql'
import { User } from '../models/User';

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "world";
  }

  @Query(() => [User])
  users() {
    return User.find()
  }
}