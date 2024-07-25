import { HTTP_STATUS } from '../../config/common/constants.js';
import { USER } from '../../config/common/messages.js';

export function sendUserNotFound(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: USER.ERROR.NOT_FOUND });
}

export function sendUserAllFieldsRequired(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: USER.ERROR.ALL_FIELDS_REQUIRED });
}

export function sendUserDuplicateUsername(res) {
  return res
    .status(HTTP_STATUS.ERROR.CONFLICT)
    .json({ message: USER.ERROR.DUPLICATE_USERNAME });
}

export function sendUserCreated(res, username) {
  return res
    .status(HTTP_STATUS.SUCCESS.CREATED)
    .json({ message: USER.SUCCESS.CREATED(username) });
}

export function sendUserInvalidData(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: USER.ERROR.INVALID_DATA });
}

export function sendSpecificFieldsRequired(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: USER.ERROR.FIELDS_REQUIRED });
}

export function sendUserUpdated(res, username) {
  return res.json({ message: USER.SUCCESS.UPDATED(username) });
}

export function sendUserIdRequired(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: USER.ERROR.ID_REQUIRED });
}

export function sendUserDeleted(res, username, userId) {
  res.status(HTTP_STATUS.SUCCESS.OK).json({
    message: USER.SUCCESS.DELETED(username, userId),
  });
}
