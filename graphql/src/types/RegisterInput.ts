import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "../User/isEmailAlreadyExist";
import { PasswordMixin } from "./PasswordInput";

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "email already in use" })
  email: string;
};
