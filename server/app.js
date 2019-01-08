import {} from 'dotenv/config';
import debug from 'debug';

// Packages
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import RedisStorePackage from 'connect-redis';
import routes from 'express-recursive-routes';
import session from 'express-session';

global.log = {
  api: debug('cms:api'),
  config: debug('cms:config'),
  db: debug('cms:db*'),
  redis: debug('cms:db:redis'),
  mongodb: debug('cms:db:mongodb'),
  model: debug('cms:model'),
  route: debug('cms:route'),
};
global.log.config('Packages loaded.');

// Create the express instance and load all imported packages.
const app = express();

app.set('trust proxy', 1);
app.use(
  session({
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: null,
    },
    resave: true,
    saveUninitialized: false,
    secret: process.env.SECRET,
    store: redisStore,
  })
);
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
global.log.config('Packages enabled.');

// Configure database and redis-connect middleware, connecting to DB.
let dbConnections = 0;

const RedisStore = RedisStorePackage(session);
const redisSessionStoreOptions = {
  host: process.env.DB_REDIS_HOST || '127.0.0.1',
  password: process.env.DB_REDIS_PASSWORD,
  port: process.env.DB_REDIS_PORT || '6379',
  retry_strategy(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('REDIS: The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('REDIS: Retry time exhausted');
    }
    if (options.attempt > 10) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  },
};
const redisStore = new RedisStore(redisSessionStoreOptions);
redisStore.client
  .on('connect', () => {
    global.log.redis('Connecting to db...');
  })
  .on('ready', () => {
    global.log.redis('Successfully connected to db!');
    dbConnections += 1;
    if (dbConnections == 2) {
      app.emit('db-connected');
    }
  })
  .on('error', err => {
    global.log.redis('Could not connect to db!', err);
  });

// Connect to mongodb to hold user credentials.
const dbUrl =
  'mongodb://' + process.env.DB_MONGO_URL + ':' + process.env.DB_MONGO_PORT + '/' + process.env.DB_MONGO_NAME;
mongoose
  .connect(
    dbUrl,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
    },
    () => {
      global.log.mongodb('Connecting to db...');
    }
  )
  .then(() => {
    global.log.mongodb('Successfully connected to db!');
    dbConnections += 1;
    if (dbConnections == 2) {
      app.emit('db-connected');
    }
  })
  .catch(err => {
    global.log.mongodb('Could not connect to db!', err);
  });

// When DB is connected, load routes and setup 404.
app.on('db-connected', () => {
  routes.mountRoutes(app, './server/routes');

  app.use((req, res) => {
    res.status(404).send('<h1>404 - Not found</h1>');
  });

  global.log.config('Routes added.');

  app.emit('ready');
});

// Start the server when DB is running and routes are loaded.
const httpServer = http.Server(app);
app.on('ready', () => {
  global.log.config('Starting server...');

  const port = process.env.PORT || 3000;
  const server = httpServer.listen(port, () => {
    global.log.config(`Server running on port ${port}.`);
  });

  app.on('close', () => {
    global.log.config('Server closed.');
    server.close();
  });
});

export default app;
