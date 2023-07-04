import { LoginInput, User } from '../models/User'
import bcrypt from 'bcrypt'
import { signJwt } from '../../../security/Jwt'

export default class UserService {
  async login (input: LoginInput): Promise<string> {
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
    return token
  }

  getUsers () {
    return User.find()
  }
}