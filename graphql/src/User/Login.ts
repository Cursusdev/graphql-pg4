import {
  Arg,
  Ctx,
  Query,
  Mutation,
  Resolver
} from "type-graphql";

import { User } from '../entity/User'
import { MyContext } from "../types/MyContext";
import bcrypt from "bcryptjs";

@Resolver()
export class LoginResolver {

  @Query(() => [User])
  registers() {
    return User.find();
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
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

    ctx.req.session!.userId = user.id;

    return user;
  }

}
