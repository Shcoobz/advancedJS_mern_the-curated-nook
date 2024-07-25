import { DEFAULT, DELIMITER, HTTP_STATUS, INDEX } from './common/constants.js';
import { ERROR } from './common/messages.js';

export const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(DELIMITER.COMMA)
  : DEFAULT.ORIGINS;

function getCorsOrigin(allowedOrigins) {
  return (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== INDEX.NO_MATCH || !origin) {
      callback(null, true);
    } else {
      callback(new Error(ERROR.CORS.NOT_ALLOWED));
    }
  };
}

export const corsOptions = {
  origin: getCorsOrigin(allowedOrigins),
  credentials: true,
  optionsSuccessStatus: HTTP_STATUS.SUCCESS.OK,
};
