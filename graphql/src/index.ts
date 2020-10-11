import { config as configEnv } from 'dotenv'
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import connectRedis from "connect-redis";

import express from "express";
import session from "express-session";
import "reflect-metadata";
import cors from "cors";
import { redis } from "./redis";
import { createSchema } from "./common/createSchema"

configEnv()
const { SETTINGS_SESSION_SECRET, URL_CLIENT, NODE_ENV } = process.env;

const startServer = async () => {
  await createConnection();

  const schema = await createSchema();

  const context = ({ req, res }: any) => ({ req, res })

  const server = new ApolloServer({
    schema,
    context
  });

  const app = express();
  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: `${URL_CLIENT}`
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: `${SETTINGS_SESSION_SECRET}`,
      resave: false,
      saveUninitialized: false,
      cookie: { 
        httpOnly: true, // prevents the browser from reading the cookie
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        path: '/',  // explicitly set this for security purposes
        // sameSite: 'strict', // to avoid CSRF and XSSI attacks
        secure: `${NODE_ENV}` === "production" // read cookie via encrypted connection
      }
    })
  );

  server.applyMiddleware({ app, cors: false });
  
  app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer().catch(err => console.error(err));
