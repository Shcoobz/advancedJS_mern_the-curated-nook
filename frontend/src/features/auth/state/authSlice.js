import { createSlice } from '@reduxjs/toolkit';
import { API } from '../../../config/common/constants';

const authSlice = createSlice({
  name: API.AUTH.sliceName,
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export function selectCurrentToken(state, sliceName) {
  return state[sliceName].token;
}
// ==> call: const currentToken = selectCurrentToken(state, API.AUTH.sliceName);
