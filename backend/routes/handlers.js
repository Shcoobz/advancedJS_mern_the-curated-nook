import path from 'path';

import { __dirname } from '../config/common/dirname.js';
import { ROUTE, FILE, CONTENT_TYPE, HTTP_STATUS } from '../config/common/constants.js';
import { SERVER } from '../config/common/messages.js';

export function handleWildcardRoute(req, res) {
  res.status(HTTP_STATUS.ERROR.NOT_FOUND);

  if (req.accepts(CONTENT_TYPE.HTML)) {
    res.sendFile(path.join(__dirname, ROUTE.STATIC.VIEWS, FILE.ERROR_404));
  } else if (req.accepts(CONTENT_TYPE.JSON)) {
    res.json({ message: SERVER.NOT_FOUND });
  } else {
    res.type(CONTENT_TYPE.TEXT).send(SERVER.NOT_FOUND);
  }
}
