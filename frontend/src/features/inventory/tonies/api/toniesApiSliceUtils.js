import { createEntityAdapter } from '@reduxjs/toolkit';
import { initialState } from './toniesApiSlice';
import {
  LINK,
  HTTP_STATUS,
  TAG_TYPE,
  HTTP_METHOD,
} from '../../../../config/common/constants';

export const toniesAdapter = createEntityAdapter({});

function validateTonieResponseStatus(response, result) {
  return response.status === HTTP_STATUS.SUCCESS.ok && !result.isError;
}

export function getTonieQuery() {
  return {
    url: LINK.TONIE.tonies,
    validateStatus: validateTonieResponseStatus,
  };
}

export function transformTonieResponse(responseData) {
  const loadedTonies = responseData.map((tonie) => ({ ...tonie, id: tonie._id }));

  return toniesAdapter.setAll(initialState, loadedTonies);
}

export function provideToniesTags(result) {
  if (result?.ids) {
    return [
      { type: TAG_TYPE.TONIE.type, id: TAG_TYPE.TONIE.id },
      ...result.ids.map((id) => ({ type: TAG_TYPE.TONIE.type, id })),
    ];
  } else {
    return [{ type: TAG_TYPE.TONIE.type, id: TAG_TYPE.TONIE.id }];
  }
}

export function addNewTonieQuery(initialTonie) {
  return {
    url: LINK.TONIE.tonies,
    method: HTTP_METHOD.post,
    body: { ...initialTonie },
  };
}

export function updateTonieQuery(initialTonie) {
  return {
    url: LINK.TONIE.tonies,
    method: HTTP_METHOD.patch,
    body: { ...initialTonie },
  };
}

export function deleteTonieQuery({ id }) {
  return {
    url: LINK.TONIE.tonies,
    method: HTTP_METHOD.delete,
    body: { id },
  };
}

export function invalidateToniesTags() {
  return [{ type: TAG_TYPE.TONIE.type, id: TAG_TYPE.TONIE.id }];
}

export function invalidateTonieTag(result, error, arg) {
  return [{ type: TAG_TYPE.TONIE.type, id: arg.id }];
}
