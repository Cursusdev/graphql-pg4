import {
  Resolver,
  Mutation,
  Arg
} from "type-graphql";
import { v4 } from "uuid";

import { sendEmail } from "../common/sendEmail";
import { User } from "../entity/User";
import { redis } from "../redis";

@Resolver()
export class ForgotPasswordResolver {

  @Mutation(() => Boolean)
  async forgotPassword(
      @Arg("email") email: string
    ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return true;
    }

    const token = v4();
    console.log("forgot", `${token}`)
    await redis.set("forgot-password:" + token, user.id, "ex", 60 * 60 * 24); // 1 day expiration

    await sendEmail(
      email,
      `http://localhost:3000/user/change-password/${token}`
    );
    return true;
  }

};
