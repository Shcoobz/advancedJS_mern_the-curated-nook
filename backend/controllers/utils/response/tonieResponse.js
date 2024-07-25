import { HTTP_STATUS } from '../../../config/common/constants';
import { ENTITY, ERROR } from '../../../config/common/messages';

export function sendTonieNotFound(res) {
  return res
    .status(HTTP_STATUS.ERROR.NOT_FOUND)
    .json({ message: ERROR.NOT_FOUND(ENTITY.TONIE) });
}
