import { Resolver, Query, Ctx, Mutation, Arg, Authorized } from 'type-graphql'
import { LoginInput, User } from '../models/User'
import Context from '../../../types/global/Context'
import UserService from '../services/UserService'

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService()
  }

  @Query(() => String)
  hello() {
    return 'world'
  }

  @Mutation(() => String) // Returns the JWT
  async login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    const token = await this.userService.login(input)
    // set a cookie for the jwt
    context.res.cookie('accessToken', token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })
    return token
  }

  @Authorized()
  @Query(() => User)
  async me(@Ctx() context: Context) {
    return context.user
  }

  @Authorized('ADMIN')
  @Query(() => [User])
  users() {
    return this.userService.getUsers()
  }
}
