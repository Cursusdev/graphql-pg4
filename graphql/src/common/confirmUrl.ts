import { v4 } from "uuid";
import { redis } from "../redis";

export const confirmEmailUrl = async (userId: number) => {
  const token = v4();
  console.log("confirmation:", `${token}`)
  await redis.set("user-confirmation:" + token, userId, "ex", 60 * 60 * 24); // 1 day expiration
  return `http://localhost:3000/user/confirm/${token}`;
};
