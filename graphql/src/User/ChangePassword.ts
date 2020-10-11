import {
  Resolver,
  Mutation,
  Arg,
  Ctx
} from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../entity/User";
import { redis } from "../redis";
import { ChangePasswordInput } from "../types/ChangePasswordInput";
import { MyContext } from "../types/MyContext";

@Resolver()
export class ChangePasswordResolver {

  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data")
    { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const userId = await redis.get("forgot-password:" + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    await redis.del("forgot-password:" + token);

    user.password = await bcrypt.hash(password, 12);

    await user.save();

    ctx.req.session!.userId = user.id;

    const expire = ctx.req.session!.cookie.expires;

    await User.update(
      { id: parseInt(userId, 10) },
      { confirmed: true , token: token, tokenExpiration: expire.toString() }
    );

    return user;
  }

};
