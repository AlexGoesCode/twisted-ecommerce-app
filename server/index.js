import express from 'express';
import cors from 'cors';
import colors from 'colors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const { black } = colors;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Port = process.env.PORT || 5022;

app.listen(() => {
  console.log(`server running on port: ${Port}`.bgCyan);
});

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.Mongo_DB);
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
  loadRoutes(app);
  startServer(app);
})();
// a self-contained function that initializes an Express application, establishes a DB connection,
// adds necessary middleware, sets up routes, and starts the server.
// The use of an IIFE ensures that all these steps are executed immediately
// when the script is run, and the use of async/await ensures that asynchronous operations are handled correctly.
