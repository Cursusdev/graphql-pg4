import {
  Resolver,
  Query,
  Arg
} from "type-graphql";

import { User } from '../entity/User'
import bcrypt from "bcryptjs";

@Resolver()
export class AuthUserResolver {

  @Query(() => User, { nullable: true })
  async authUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    if (!user.confirmed) {
      return null;
    }

    return user;
  }

}
