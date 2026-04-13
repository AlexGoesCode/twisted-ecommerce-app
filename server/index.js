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
// import itemModel from './models/itemModel.js';
import { allowedOrigins, baseUrl, port, mongoDbUrl } from './serverConfig.js';

dotenv.config();

console.log('Environment Variables:');
console.log('BASE_URL:', baseUrl);
console.log('PORT:', port);
console.log('MONGO_DB:', mongoDbUrl);

const { black } = colors;

//* Simplified CORS config for testing purpose
const addMiddlewares = (app) => {
  app.use(
    cors({
      origin: '*', // Allow all origins for testing purposes
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  cloudinaryConfig();
  console.log('Middlewares added');
};

// Add the middleware functions by calling app.use()
// const addMiddlewares = (app) => {
//   app.use(
//     cors({
//       origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//           callback(null, true);
//         } else {
//           callback(new Error('Not allowed by CORS'));
//         }
//       },
//       credentials: true,
//     })
//   );
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   cloudinaryConfig();
//   console.log('Middlewares added');
// };

// Start the server by calling app.listen()
const startServer = (app) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

const loadRoutes = (app) => {
  app.use(`${baseUrl}/test`, testRouter);
  app.use(`${baseUrl}/items`, itemRouter);
  app.use(`${baseUrl}/users`, usersRouter);
  app.use(`${baseUrl}/orders`, ordersRouter);
  console.log('Routes loaded');
};

// Module-level flag: persists across warm Vercel invocations so we only
// open one connection per Lambda container instead of reconnecting every request.
let isConnected = false;

const DBConnection = async () => {
  if (isConnected) return; // reuse existing connection on warm invocations
  try {
    await mongoose.connect(mongoDbUrl, {
      maxPoolSize: 1, // one connection per serverless instance avoids Atlas connection storms
    });
    isConnected = true;
    console.log('Connection with MongoDB established'.bgGreen);
  } catch (error) {
    console.log('Problem with connecting to MongoDB'.bgRed, error);
    throw error; // propagate so the request fails fast rather than hanging
  }
};

// App and routes are set up once at module load time — synchronously, no DB call.
// This runs on every cold start but is fast (no network I/O).
const app = express();
addMiddlewares(app);
loadRoutes(app);

app.use((_req, res, _next) => {
  res.status(404).send('Not Found');
});

// Vercel serverless export: called per request.
// DBConnection() is a no-op on warm invocations thanks to the isConnected guard.
export default async function handler(req, res) {
  await DBConnection();
  return app(req, res);
}

// Local development only: connect then start the HTTP server.
// process.env.VERCEL is injected automatically by Vercel's runtime.
if (!process.env.VERCEL) {
  DBConnection().then(() => startServer(app));
}
