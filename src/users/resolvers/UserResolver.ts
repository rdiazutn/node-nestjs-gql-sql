import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { LoginInput, User } from '../models/User.entity'
import UserService from '../services/UserService'
import { Inject, UseGuards } from '@nestjs/common'
import { AuthorizeGuard } from 'src/guards/AuthorizeGuard'
import { RolesGuard } from 'src/guards/RolesGuard'
import { GraphqlApplicationContext } from '../security/GraphqlApplicationContext'

@Resolver()
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query(() => String)
  test() {
    return 'hi'
  }

  @Mutation(() => String) // Returns the JWT
  async login(
    @Args('input') input: LoginInput,
    @Context() context: GraphqlApplicationContext,
  ) {
    const token = await this.userService.login(input)
    // set a cookie for the jwt
    context['res'].cookie('accessToken', token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: '127.0.0.1',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })
    return token
  }

  @UseGuards(AuthorizeGuard, new RolesGuard(['ADMIN']))
  @Query(() => [User])
  users() {
    return this.userService.findAll()
  }
}
