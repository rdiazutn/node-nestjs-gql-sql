import { Resolver, Query, Ctx, Mutation, Arg } from 'type-graphql'
import { LoginInput, User } from '../models/User';
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
    console.log(user)
    if (!user) {
      throw new Error(loginError)
    }
    const passwordIsValid = await bcrypt.compare(input.password, user.password)
    console.log({passwordIsValid, user})
    if (!passwordIsValid) {
      throw new Error(loginError)
    }
    const token = signJwt(user.toString())
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
}