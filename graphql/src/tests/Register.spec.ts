import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "./testConn";
import { gqlCall } from "./gqlCall";
import { User } from "../entity/User";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    email
  }
}
`;

describe("Register", () => {
  it.only("create user", async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const response = await gqlCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    if (response.errors) {
      console.log(response.errors[0].originalError);
    }

    expect(response).toMatchObject({
      data: {
        register: {
          email: user.email
        }
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
  });
});
