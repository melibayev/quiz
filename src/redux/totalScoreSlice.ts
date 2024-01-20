import { createSlice } from '@reduxjs/toolkit';

interface TotalScoreSlice {
  value: number;
}

const initialState: TotalScoreSlice = {
  value: 0,
};

const totalScoreSlice = createSlice({
  name: 'totalScore',
  initialState,
  reducers: {
    increaseTheScore: (state) => {
      state.value += 100;
    },
  },
});

export const { increaseTheScore } = totalScoreSlice.actions;
export default totalScoreSlice.reducer;
