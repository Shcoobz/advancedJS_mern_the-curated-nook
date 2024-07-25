import { HTTP_STATUS } from '../../../config/common/constants.js';
import { ERROR, ENTITY, FIELD, SUCCESS } from '../../../config/common/messages.js';

export function sendBooksNotFound(res) {
  return res
    .status(HTTP_STATUS.ERROR.NOT_FOUND)
    .json({ message: ERROR.NOT_FOUND(ENTITY.BOOK) });
}

export function sendBooks(res, books) {
  return res.json(books);
}

export function sendTitleRequired(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: ERROR.FIELDS_REQUIRED(ENTITY.BOOK, FIELD.TITLE) });
}

export function sendIsbnRequired(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: ERROR.FIELDS_REQUIRED(ENTITY.BOOK, FIELD.ISBN) });
}

export function sendBookDuplicateIsbn(res) {
  return res
    .status(HTTP_STATUS.ERROR.CONFLICT)
    .json({ message: ERROR.DUPLICATE(ENTITY.BOOK) });
}

export function sendBookCreated(res, title) {
  return res
    .status(HTTP_STATUS.SUCCESS.CREATED)
    .json({ message: SUCCESS.CREATED(ENTITY.BOOK, title) });
}

export function sendBookInvalidData(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: ERROR.INVALID_DATA(ENTITY.BOOK) });
}

export function sendBookUpdated(res, title) {
  return res.status(HTTP_STATUS.SUCCESS.OK).json({
    message: SUCCESS.UPDATED(ENTITY.BOOK, title),
  });
}

export function sendIdRequired(res) {
  return res
    .status(HTTP_STATUS.ERROR.BAD_REQUEST)
    .json({ message: ERROR.FIELDS_REQUIRED(ENTITY.BOOK, FIELD.ID) });
}

export function sendBookDeleted(res, title, id) {
  return res.status(HTTP_STATUS.SUCCESS.OK).json({
    message: SUCCESS.DELETED(ENTITY.BOOK, title, id),
  });
}
