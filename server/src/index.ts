import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME, __prod__ } from './constants';
import { CityResolver } from './resolvers/city';
import { UserResolver } from './resolvers/user';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { User } from './entities/User';
import { City } from './entities/City';
import path from 'path';
import { Favourite } from './entities/Favourite';
import { FavouriteResolver } from './resolvers/favourite';
import { Checklist } from './entities/Checklist';
import { ChecklistResolver } from './resolvers/checklist';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    username: 'postgres',
    password: 'postgres',
    database: 'roam2',
    // synchronize: true,
    logging: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User, City, Favourite, Checklist],
  });
  await conn.runMigrations();

  const app = express();

  let RedisStore = connectRedis(session);
  let redisClient = redis.createClient();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: 'hfaodjfoajkldajkldja',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        CityResolver,
        UserResolver,
        FavouriteResolver,
        ChecklistResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log('server running on http://loaclhost:4000  🚀');
  });
};

main().catch((err) => {
  console.error(err);
});
