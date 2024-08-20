import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { API, HTTP_STATUS, LINK, TAG_TYPE } from '../../config/common/constants';
import { getToken, prepareRequestHeaders, refreshToken } from './apiSliceUtils';
import { logOut, setCredentials } from '../../features/auth/state/authSlice';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: API.credentials,
  prepareHeaders: (headers, { getState }) => {
    const token = getToken(getState());

    return prepareRequestHeaders(headers, token);
  },
});

// async function baseQueryWithReauth(args, api, extraOptions) {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === HTTP_STATUS.ERROR.forbidden) {
//     const refreshResult = await refreshToken(api, extraOptions);

//     if (refreshResult?.data) {
//       api.dispatch(setCredentials({ ...refreshResult.data }));

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       if (refreshResult?.error?.status === 403) {
//         api.dispatch(logOut());

//         sessionStorage.setItem(
//           'authFailed',
//           'Your login has expired. Please log in again!'
//         );

//         window.location.href = '/';
//       }
//     }
//   }

//   return result;
// }

async function baseQueryWithReauth(args, api, extraOptions) {
  try {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === HTTP_STATUS.ERROR.forbidden) {
      const refreshResult = await refreshToken(api, extraOptions);

      if (refreshResult?.data) {
        api.dispatch(setCredentials({ ...refreshResult.data }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        if (refreshResult?.error?.status === 403) {
          api.dispatch(logOut());
          sessionStorage.setItem(
            'authFailed',
            'Your login has expired. Please log in again!'
          );
          window.location.href = '/';
        }
      }
    }

    return result;
  } catch (error) {
    console.error('API request failed:', error);
    // Handle network errors here
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      // This likely means the server is unreachable
      return {
        error: { status: 'FETCH_ERROR', data: 'Unable to connect to the server' },
      };
    }
    return { error: { status: 'UNKNOWN_ERROR', data: error.message } };
  }
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: TAG_TYPE.types,

  endpoints: (builder) => ({
    placeholder: builder.query({
      query: () => LINK.placeholder,
    }),
  }),
});
