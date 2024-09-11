import express from 'express';
import cors from 'cors';
import colors from 'colors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import testRouter from './routes/testRoute.js';
import itemRouter from './routes/itemsRouter.js';
import usersRouter from './routes/usersRouter.js';
import cloudinaryConfig from './config/cloudinary.js';
import ordersRouter from './routes/orderRouter.js';
import itemModel from './models/itemModel.js';
import { allowedOrigins, baseUrl, port, mongoDbUrl } from './serverConfig.js';

dotenv.config();

console.log('Environment Variables:');
console.log('BASE_URL:', baseUrl);
console.log('PORT:', port);
console.log('MONGO_DB:', mongoDbUrl);

const { black } = colors;

// Add the middleware functions by calling app.use()
const addMiddlewares = (app) => {
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  cloudinaryConfig();
  console.log('Middlewares added');
};

// Start the server by calling app.listen()
const startServer = (app) => {
  app.listen(port, () => {
    console.log(`Server is running on port', ${port}`);
  });
};

const loadRoutes = (app) => {
  app.use(`${baseUrl}/test`, testRouter);
  app.use(`${baseUrl}/items`, itemRouter);
  app.use(`${baseUrl}/users`, usersRouter);
  app.use(`${baseUrl}/orders`, ordersRouter);
  console.log('Routes loaded');
};

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connection with MongoDB established'.bgGreen);
  } catch (error) {
    console.log('problem with connecting to MongoDB'.bgRed, error);
  }
};

// bellow is a main function that runs the server aka IIFE:
//* Immediatelly Invoked Function Expression
// functions need to be in order after each other
(async function controller() {
  const app = express();
  addMiddlewares(app);
  await DBConnection();
  loadRoutes(app);

  // Catch-all route for undefined routes
  app.use((req, res, next) => {
    res.status(404).send('Not Found');
  });

  startServer(app);
})();

// a self-contained function that initializes an Express application, establishes a DB connection,
// adds necessary middleware, sets up routes, and starts the server.
// The use of an IIFE ensures that all these steps are executed immediately
// when the script is run, and the use of async/await ensures that asynchronous operations are handled correctly.
