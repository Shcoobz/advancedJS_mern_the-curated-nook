import { createEntityAdapter } from '@reduxjs/toolkit';
import { initialState } from './usersApiSlice';
import {
  LINK,
  HTTP_STATUS,
  TAG_TYPE,
  HTTP_METHOD,
} from '../../../config/common/constants';

export const usersAdapter = createEntityAdapter({});

function validateUserResponseStatus(response, result) {
  return response.status === HTTP_STATUS.SUCCESS.ok && !result.isError;
}

export function getUserQuery() {
  return {
    url: LINK.USER.users,
    validateStatus: validateUserResponseStatus,
  };
}

export function transformUserResponse(responseData) {
  const loadedUsers = responseData.map((user) => ({ ...user, id: user._id }));

  return usersAdapter.setAll(initialState, loadedUsers);
}

export function provideUsersTags(result) {
  if (result?.ids) {
    return [
      { type: TAG_TYPE.USER.type, id: TAG_TYPE.USER.id },
      ...result.ids.map((id) => ({ type: TAG_TYPE.USER.type, id })),
    ];
  } else {
    return [{ type: TAG_TYPE.USER.type, id: TAG_TYPE.USER.id }];
  }
}

export function addNewUserQuery(initialUser) {
  return {
    url: LINK.USER.users,
    method: HTTP_METHOD.post,
    body: { ...initialUser },
  };
}

export function updateUserQuery(initialUser) {
  return {
    url: LINK.USER.users,
    method: HTTP_METHOD.patch,
    body: { ...initialUser },
  };
}

export function deleteUserQuery({ id }) {
  return {
    url: LINK.USER.users,
    method: HTTP_METHOD.delete,
    body: { id },
  };
}

export function invalidateUsersTags() {
  return [{ type: TAG_TYPE.USER.type, id: TAG_TYPE.USER.id }];
}

export function invalidateUserTag(result, error, arg) {
  return [{ type: TAG_TYPE.USER.type, id: arg.id }];
}
