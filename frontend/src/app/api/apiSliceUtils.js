import { API, HTTP_STATUS, LINK } from '../../config/common/constants';
import { ERROR } from '../../config/common/messages';
import { setCredentials } from '../../features/auth/state/authSlice';
import { baseQuery } from './apiSlice';

export function getToken(state) {
  return state.auth.token;
}

export function prepareRequestHeaders(headers, token) {
  if (token) {
    headers.set(API.HEADER.name, API.HEADER.getAuthScheme(token));
  }

  return headers;
}

export async function refreshToken(api, extraOptions) {
  const refreshResult = await baseQuery(LINK.AUTH.refresh, api, extraOptions);

  if (refreshResult?.data) {
    api.dispatch(setCredentials({ ...refreshResult.data }));

    return null;
  }

  if (refreshResult?.error?.status === HTTP_STATUS.ERROR.forbidden) {
    refreshResult.error.data.message = ERROR.API.loginExpired;
  }

  return refreshResult;
}
