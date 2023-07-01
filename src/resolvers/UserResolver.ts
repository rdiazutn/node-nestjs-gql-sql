import { Resolver, Query, Ctx, Mutation, Arg, Authorized } from 'type-graphql'
import { LoginInput, User } from '../models/User'
import Context from '../types/global/Context'
import bcrypt from 'bcrypt'
import { signJwt } from '../security/Jwt'

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'world'
  }

  @Mutation(() => String) // Returns the JWT
  async login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    const loginError = 'Invalid username or password'
    const user = await User.findOne({ where: { username: input.username } })
    if (!user) {
      throw new Error(loginError)
    }
    const passwordIsValid = await bcrypt.compare(input.password, user.password)
    if (!passwordIsValid) {
      throw new Error(loginError)
    }
    // TODO: move to Redis
    const token = signJwt(user.toString())
    user.token = token
    await user.save()
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
    return User.find()
  }
}
