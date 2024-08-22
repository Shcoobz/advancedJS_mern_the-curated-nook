import { FILE, HTTP_STATUS } from '../config/common/constants.js';
import { logEvents } from './logger.js';

export async function errorHandler(err, req, res, next) {
  const logMessage = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
  const status = res.statusCode ? res.statusCode : HTTP_STATUS.ERROR.SERVER.INTERNAL;

  await logEvents(logMessage, FILE.ERR_LOG);

  console.log(err.stack);

  res.status(status);

  res.json({ message: err.message, isError: true });
}
