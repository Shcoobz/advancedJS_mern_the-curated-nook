import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import rootRouter from './routes/root.js';
import { __dirname } from './config/common/dirname.js';
import { ROUTE } from './config/common/constants.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { handleWildcardRoute } from './routes/handlers.js';
import { serveStaticPublicFiles } from './middleware/utils.js';

const app = express();
const PORT = process.env.PORT || 3500;
const HTTP_LOCALHOST = process.env.HTTP_LOCALHOST;

app.use(logger);
app.use(express.json());
app.use(cookieParser());

app.use(ROUTE.ROOT, serveStaticPublicFiles());

app.use(ROUTE.ROOT, rootRouter);

app.all(ROUTE.WILDCARD, handleWildcardRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\nServer running on ${PORT}, visit: ${HTTP_LOCALHOST}:${PORT}\n`);
});
