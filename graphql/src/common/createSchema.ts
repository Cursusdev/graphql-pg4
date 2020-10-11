import { buildSchema } from "type-graphql";
import { LoginResolver } from '../User/Login';
import { MeResolver } from '../User/Me';
import { RegisterResolver } from '../User/Register';
import { ConfirmUserResolver } from '../User/ConfirmUser';
import { AuthUserResolver } from '../User/AuthUser';
import { LogoutResolver } from "../User/Logout";
import { ForgotPasswordResolver } from "../User/ForgotPassword";
import { ChangePasswordResolver } from "../User/ChangePassword";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      LoginResolver,
      MeResolver,
      RegisterResolver,
      ConfirmUserResolver,
      AuthUserResolver,
      LogoutResolver,
      ForgotPasswordResolver,
      ChangePasswordResolver,
    ]
  });
