import { 
  Arg,
  Ctx,
  Resolver,
  Mutation
} from "type-graphql";

import { redis } from "../redis";
import { User } from "../entity/User";
import { MyContext } from "../types/MyContext";

@Resolver()
export class ConfirmUserResolver {

  @Mutation(() => Boolean)
  async confirmUser(
      @Arg("token") token: string,
      @Ctx() ctx: MyContext
    ): Promise<boolean> {
    const userId = await redis.get("user-confirmation:" + token);

    if (!userId) {
      return false;
    }

    const expire = ctx.req.session!.cookie.expires;

    await User.update(
      { id: parseInt(userId, 10) },
      { confirmed: true , token: token, tokenExpiration: expire.toString() }
    );
    await redis.del(token);

    return true;
  }

}
