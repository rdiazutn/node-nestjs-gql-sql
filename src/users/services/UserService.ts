import * as bcrypt from 'bcrypt'
import { signJwt } from '../security/Jwt'
import { LoginInput, User } from '../models/User.entity'
import { Inject } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

export default class UserService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async login(input: LoginInput): Promise<string> {
    const loginError = 'Invalid username or password'
    // TODO: remove
    await User.create({
      username: 'admin',
      password: 'admin',
      role: 'ADMIN',
    }).save()
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
    await this.cacheManager.set(token, user)
    return token
  }

  findAll() {
    return User.find()
  }
}
