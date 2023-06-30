import { Resolver, Query, Ctx } from 'type-graphql'
import { User } from '../models/User';
import { Salesman } from '../models/Salesman';

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

  // @Query(() => [Salesman])
  // salesmans(@Ctx() ctx: any) {
  //   console.log('------------------------------')
  //   return Salesman.find({
  //     relations: ['branch']
  //   })
  // }
}