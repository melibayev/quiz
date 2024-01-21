import { createSlice } from '@reduxjs/toolkit';

interface AuthorizationSlice {
  value: boolean;
}

const initialState: AuthorizationSlice = {
  value: false,
};

const authorizationSlice = createSlice({
  name: 'authorizationSetting',
  initialState,
  reducers: {
    authorized: (state) => {
      state.value = true;
    },
    notAuthorized: (state) => {
      state.value = false;
    },
  },
});

export const { authorized, notAuthorized } = authorizationSlice.actions;
export default authorizationSlice.reducer;
