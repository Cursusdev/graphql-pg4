import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx
} from 'type-graphql';

import { User } from '../entity/User';
import { RegisterInput } from "../types/RegisterInput";
import bcrypt from 'bcryptjs';
import { MyContext } from '../types/MyContext';
import { sendEmail } from '../common/sendEmail';
import { confirmEmailUrl } from '../common/confirmUrl';

@Resolver()
export class RegisterResolver {

  @Query(() => [User])
  registers() {
    return User.find();
  }

  @Mutation(() => User)
  async register(
    @Arg("data") {
      email,
      password
    }: RegisterInput,
    @Ctx() ctx: MyContext
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword
    }).save();

    await sendEmail(email, await confirmEmailUrl(user.id));

    ctx.req.session!.userId = user.id;

    return user
  }

}
