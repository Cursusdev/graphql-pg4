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

const meQuery = `
{
  me {
    id
    email
  }
}
`;

describe("Me session", () => {
  it("Get session user", async () => {
    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password()
    }).save();

    const response = await gqlCall({
      source: meQuery,
      userId: user.id
    });

    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          email: user.email
        }
      }
    });
  });

  it("Return null", async () => {
    const response = await gqlCall({
      source: meQuery
    });

    expect(response).toMatchObject({
      data: {
        me: null
      }
    });
  });
});
