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

// This variable lives outside the function so it stays in memory between requests.
// On Vercel, the server can reuse the same connection instead of reconnecting every time.
let isConnected = false;

const DBConnection = async () => {
  // If we are already connected, skip reconnecting
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(mongoDbUrl, {
      maxPoolSize: 1, // keep only 1 connection open (important for serverless hosting)
    });
    isConnected = true;
    console.log('Connection with MongoDB established'.bgGreen);
  } catch (error) {
    console.log('Problem with connecting to MongoDB'.bgRed, error);
  }
};

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
