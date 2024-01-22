import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { TOKEN } from '../const';

interface AuthorizationSlice {
  value: boolean;
  token?: string | undefined;
}

const initialToken = Cookies.get(TOKEN);

const initialState: AuthorizationSlice = {
  value: false,
  token: initialToken,
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
      state.token = undefined;
    },
    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload; 
    },
  },
});

export const { authorized, notAuthorized, setToken } = authorizationSlice.actions;
export default authorizationSlice.reducer;
