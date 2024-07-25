import express from 'express';
import path from 'path';
import { __dirname } from '../config/common/dirname.js';
import { ROUTE, REGEX, FILE } from '../config/common/constants.js';

const rootRouter = express.Router();

rootRouter.get(REGEX.HOMEPAGE_ROUTE, (req, res) => {
  res.sendFile(path.join(__dirname, ROUTE.STATIC.VIEWS, FILE.MAIN_HTML));
});

export default rootRouter;
