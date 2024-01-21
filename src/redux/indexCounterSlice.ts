import { createSlice } from '@reduxjs/toolkit';

interface IndexCounterSlice {
  value: number;
}

const initialState: IndexCounterSlice = {
  value: 0,
};

const indexCounterSlice = createSlice({
  name: 'indexCounter',
  initialState,
  reducers: {
    increase: (state) => {
      state.value += 1;
    },
    resetState: (state) => {
      state.value = 0;
    },
  },
});

export const { increase, resetState } = indexCounterSlice.actions;
export default indexCounterSlice.reducer;
