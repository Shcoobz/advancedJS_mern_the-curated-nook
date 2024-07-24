import { HTTP_STATUS, INDEX } from './common/constants.js';
import { ERROR } from './common/messages.js';

export const allowedOrigins = ['http://localhost:3000'];

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
