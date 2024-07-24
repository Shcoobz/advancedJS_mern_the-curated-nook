import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rootRouter from './routes/root.js';
import connectDB from './config/database/dbConnection.js';

import { __dirname } from './config/common/dirname.js';
import { ROUTE } from './config/common/constants.js';
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
const HTTP_LOCALHOST = process.env.HTTP_LOCALHOST;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(ROUTE.ROOT, serveStaticPublicFiles());

app.use(ROUTE.ROOT, rootRouter);

app.all(ROUTE.WILDCARD, handleWildcardRoute);

app.use(errorHandler);

handleMongoOpen(app, PORT, HTTP_LOCALHOST);
handleMongoError();
handleMongoDisconnected();
handleMongoReconnected();
