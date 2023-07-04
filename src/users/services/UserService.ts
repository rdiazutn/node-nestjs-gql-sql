import * as bcrypt from 'bcrypt';
import { signJwt } from '../security/Jwt';
import { LoginInput, User } from '../models/User.entity';

export default class UserService {
  async login(input: LoginInput): Promise<string> {
    const loginError = 'Invalid username or password';
    // TODO: REMVOE
    await User.create({
      username: 'admin',
      password: 'admin',
      role: 'ADMIN',
    }).save();
    const user = await User.findOne({ where: { username: input.username } });
    if (!user) {
      throw new Error(loginError);
    }
    const passwordIsValid = await bcrypt.compare(input.password, user.password);
    if (!passwordIsValid) {
      throw new Error(loginError);
    }
    // TODO: move to Redis
    const token = signJwt(user.toString());
    user.token = token;
    await user.save();
    return token;
  }

  findAll() {
    return User.find();
  }
}
