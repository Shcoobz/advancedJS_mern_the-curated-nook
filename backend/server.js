import 'dotenv/config';
import path from 'path';
import express from 'express';
import { __dirname } from './config/common/dirname.js';
import rootRouter from './routes/root.js';
import { CONTENT_TYPE, FILE, HTTP_STATUS, ROUTE } from './config/common/constants.js';
import { SERVER } from './config/common/messages.js';

const app = express();
const PORT = process.env.PORT || 3500;
const HTTP_LOCALHOST = process.env.HTTP_LOCALHOST;

app.use(ROUTE.ROOT, express.static(path.join(__dirname, ROUTE.STATIC.PUBLIC)));

app.use(ROUTE.ROOT, rootRouter);

app.all(ROUTE.WILDCARD, (req, res) => {
  res.status(HTTP_STATUS.ERROR.NOT_FOUND);

  if (req.accepts(CONTENT_TYPE.HTML)) {
    res.sendFile(path.join(__dirname, ROUTE.STATIC.VIEWS, FILE.ERROR_404));
  } else if (req.accepts(CONTENT_TYPE.JSON)) {
    res.json({ message: SERVER.NOT_FOUND });
  } else {
    res.type(CONTENT_TYPE.TEXT).send(SERVER.NOT_FOUND);
  }
});

app.listen(PORT, () => {
  console.log(`\nServer running on ${PORT}, visit: ${HTTP_LOCALHOST}:${PORT}`);
});
