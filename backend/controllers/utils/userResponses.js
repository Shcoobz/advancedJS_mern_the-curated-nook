import { HTTP_STATUS } from '../../config/common/constants.js';
import { ENTITY, ERROR, FIELD, SUCCESS } from '../../config/common/messages.js';

export function sendUserNotFound(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: ERROR.NOT_FOUND(ENTITY.USER) });
}

export function sendUserAllFieldsRequired(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: ERROR.ALL_FIELDS_REQUIRED(ENTITY.USER) });
}

export function sendUserDuplicateUsername(res) {
  return res
    .status(HTTP_STATUS.ERROR.CONFLICT)
    .json({ message: ERROR.DUPLICATE(ENTITY.USER) });
}

export function sendUserCreated(res, username) {
  return res
    .status(HTTP_STATUS.SUCCESS.CREATED)
    .json({ message: SUCCESS.CREATED(ENTITY.USER, username) });
}

export function sendUserInvalidData(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: ERROR.INVALID_DATA(ENTITY.USER) });
}

export function sendSpecificFieldsRequired(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: ERROR.FIELDS_REQUIRED(ENTITY.USER, FIELD.PASSWORD) });
}

export function sendUserUpdated(res, username) {
  return res.json({ message: SUCCESS.UPDATED(ENTITY.USER, username) });
}

export function sendUserIdRequired(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: ERROR.ID_REQUIRED(ENTITY.USER) });
}

export function sendUserDeleted(res, username, userId) {
  return res.status(HTTP_STATUS.SUCCESS.OK).json({
    message: SUCCESS.DELETED(ENTITY.USER, username, userId),
  });
}
