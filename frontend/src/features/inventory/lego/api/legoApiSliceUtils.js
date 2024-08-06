import { createEntityAdapter } from '@reduxjs/toolkit';
import { initialState } from './legoApiSlice';
import {
  LINK,
  HTTP_STATUS,
  TAG_TYPE,
  HTTP_METHOD,
} from '../../../../config/common/constants';

export const legoAdapter = createEntityAdapter({});

function validateLegoResponseStatus(response, result) {
  return response.status === HTTP_STATUS.SUCCESS.ok && !result.isError;
}

export function getLegoQuery() {
  return {
    url: LINK.LEGO.lego,
    validateStatus: validateLegoResponseStatus,
  };
}

export function transformLegoResponse(responseData) {
  const loadedLego = responseData.map((lego) => ({ ...lego, id: lego._id }));

  return legoAdapter.setAll(initialState, loadedLego);
}

export function provideLegoTags(result) {
  if (result?.ids) {
    return [
      { type: TAG_TYPE.LEGO.type, id: TAG_TYPE.LEGO.id },
      ...result.ids.map((id) => ({ type: TAG_TYPE.LEGO.type, id })),
    ];
  } else {
    return [{ type: TAG_TYPE.LEGO.type, id: TAG_TYPE.LEGO.id }];
  }
}

export function addLegoNewQuery(initialLego) {
  return {
    url: LINK.LEGO.lego,
    method: HTTP_METHOD.post,
    body: { ...initialLego },
  };
}

export function updateLegoQuery(initialLego) {
  return {
    url: LINK.LEGO.lego,
    method: HTTP_METHOD.patch,
    body: { ...initialLego },
  };
}

export function deleteLegoQuery({ id }) {
  return {
    url: LINK.LEGO.lego,
    method: HTTP_METHOD.delete,
    body: { id },
  };
}

export function invalidateLegoTags() {
  return [{ type: TAG_TYPE.LEGO.type, id: TAG_TYPE.LEGO.id }];
}

export function invalidateLegoTag(result, error, arg) {
  return [{ type: TAG_TYPE.LEGO.type, id: arg.id }];
}
