import mongoose from 'mongoose';
import { logEvents } from '../../middleware/logger.js';
import { ENVIRONMENT, FILE, MONGO_EVENTS } from '../common/constants.js';
import { SERVER } from '../common/messages.js';

export function handleMongoOpen(app, PORT, HTTP_HOST) {
  mongoose.connection.once(MONGO_EVENTS.OPEN, () => {
    app.listen(PORT, () => {
      const isProduction = process.env.NODE_ENV === ENVIRONMENT.PRODUCTION;
      const url = isProduction ? HTTP_HOST : `${HTTP_HOST}:${PORT}`;

      console.log(SERVER.MONGO.START(PORT, url));
    });
  });
}

export function handleMongoError() {
  mongoose.connection.on(MONGO_EVENTS.ERROR, (err) => {
    console.log('Handling MongoDB error');

    const errorMessage = `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`;

    logEvents(errorMessage, FILE.MONGO_ERR);
    console.log(err);
  });
}

export function handleMongoDisconnected() {
  mongoose.connection.on(MONGO_EVENTS.DISCONNECTED, () => {
    console.log(SERVER.MONGO.DISCONNECTED);
  });
}

export function handleMongoReconnected() {
  mongoose.connection.on(MONGO_EVENTS.RECONNECTED, () => {
    console.log(SERVER.MONGO.RECONNECTED);
  });
}
