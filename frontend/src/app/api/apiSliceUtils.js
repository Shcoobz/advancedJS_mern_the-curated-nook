export function prepareHeadersWithToken(headers, { getState }) {
  const token = getState().auth.token;

  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }

  return headers;
}
