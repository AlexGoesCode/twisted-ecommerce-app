import express from 'express';
import cors from 'cors';
import colors from 'colors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/testRoute.js';
// import { cloudinaryConfig } from './config/cloudinary.js';

dotenv.config();

const { black } = colors;

//* Add the middleware functions by calling app.use()
const addMiddlewares = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  // cloudinaryConfig();
};

//* Start the server by calling app.listen()
const startServer = (app) => {
  const port = process.env.PORT || 5022;
  app.listen(port, () => {
    console.log(`Server is running on port', ${port}`);
  });
};

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('connection with MongoDB established'.bgGreen);
  } catch (error) {
    console.log('problem with connecting to MongoDB'.bgRed, error);
  }
};

// bellow is a main function that runs the server aka IIFE:
//* Immediatelly Invoked Function Expression

(async function controller() {
  const app = express();
  await DBConnection();
  addMiddlewares(app);
  app.use('/api', router);
  startServer(app);
})();
// a self-contained function that initializes an Express application, establishes a DB connection,
// adds necessary middleware, sets up routes, and starts the server.
// The use of an IIFE ensures that all these steps are executed immediately
// when the script is run, and the use of async/await ensures that asynchronous operations are handled correctly.
