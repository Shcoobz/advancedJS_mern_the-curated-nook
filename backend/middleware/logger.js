import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { __dirname } from '../config/common/dirname.js';
import { FILE, ROUTE } from '../config/common/constants.js';
import { appendToLogFile, ensureDirectoryExists } from './utils.js';

export async function logEvents(message, logFileName) {
  const dateTime = format(new Date(), 'ddMMyyyy\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  await ensureDirectoryExists(__dirname, ROUTE.STATIC.LOGS);
  await appendToLogFile(__dirname, ROUTE.STATIC.LOGS, logFileName, logItem);
}

export function logger(req, res, next) {
  // TODO: add conditions for logging (only special requests || not coming from own url)
  const logMessage = `${req.method}\t${req.url}\t${req.headers.origin}`;
  const requestSummary = `${req.method} ${req.path}`;

  logEvents(logMessage, FILE.REQ_LOG);
  console.log(requestSummary);

  next();
}
