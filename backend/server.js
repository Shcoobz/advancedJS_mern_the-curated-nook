import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './config/database/dbConnection.js';
import rootRoutes from './routes/root.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import tonieRoutes from './routes/tonieRoutes.js';
import legoRoutes from './routes/legoRoutes.js';

import { __dirname } from './config/common/dirname.js';
import { DEFAULT, ENDPOINT, ROUTE } from './config/common/constants.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { handleWildcardRoute } from './routes/handlers.js';
import { serveStaticPublicFiles } from './middleware/utils.js';
import { corsOptions } from './config/corsOptions.js';
import {
  handleMongoDisconnected,
  handleMongoError,
  handleMongoOpen,
  handleMongoReconnected,
} from './config/database/mongoEventHandler.js';

const app = express();
const PORT = process.env.PORT || 3500;
const HTTP_HOST = process.env.HTTP_HOST || DEFAULT.HOST;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(ROUTE.ROOT, serveStaticPublicFiles());

app.use(ENDPOINT.ROOT, rootRoutes);
app.use(ENDPOINT.USERS, userRoutes);
app.use(ENDPOINT.BOOKS, bookRoutes);
app.use(ENDPOINT.TONIES, tonieRoutes);
app.use(ENDPOINT.LEGO, legoRoutes);

app.all(ROUTE.WILDCARD, handleWildcardRoute);

app.use(errorHandler);

// app.get('/trigger-mongo-error', async (req, res) => {
//   try {
//     await mongoose.connection.db
//       .collection('nonexistent')
//       .insertOne({ bad: 'operation' });
//   } catch (err) {
//     console.error('Catch block MongoDB Error Triggered:', err);
//     const errorMessage = `${err.name || 'NoErrName'}: ${err.message}`;
//     logEvents(errorMessage, FILE.MONGO_ERR_LOG);
//     res.status(500).send('MongoDB error intentionally triggered.');
//   }
// });

handleMongoOpen(app, PORT, HTTP_HOST);
handleMongoError();
handleMongoDisconnected();
handleMongoReconnected();
