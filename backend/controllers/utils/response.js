import { HTTP_STATUS } from '../../config/common/constants.js';
import { ERROR, SUCCESS } from '../../config/common/messages.js';

export function sendNotFound(res, entity) {
  return res
    .status(HTTP_STATUS.ERROR.NOT_FOUND)
    .json({ message: ERROR.NOT_FOUND(entity) });
}

export function sendItems(res, item) {
  return res.json(item);
}

export function sendAllFieldsRequired(res, entity) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: ERROR.ALL_FIELDS_REQUIRED(entity) });
}

export function sendFieldRequired(res, entity, field) {
  return res.status(HTTP_STATUS.ERROR.BAD_REQUEST).json({
    message: ERROR.FIELDS_REQUIRED(entity, field),
  });
}

export function sendDuplicateEntity(res, entity) {
  return res.status(HTTP_STATUS.ERROR.CONFLICT).json({
    message: ERROR.DUPLICATE(entity),
  });
}

export function sendInvalidData(res, entity) {
  return res.status(HTTP_STATUS.ERROR.BAD_REQUEST).json({
    message: ERROR.INVALID_DATA(entity),
  });
}

export function sendEntityCreated(res, entity, title) {
  return res.status(HTTP_STATUS.SUCCESS.CREATED).json({
    message: SUCCESS.CREATED(entity, title),
  });
}

export function sendEntityUpdated(res, entity, title) {
  return res.status(HTTP_STATUS.SUCCESS.OK).json({
    message: SUCCESS.UPDATED(entity, title),
  });
}

export function sendEntityDeleted(res, entity, title, id) {
  return res.status(HTTP_STATUS.SUCCESS.OK).json({
    message: SUCCESS.DELETED(entity, title, id),
  });
}
