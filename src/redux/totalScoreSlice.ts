import { createSlice} from '@reduxjs/toolkit';
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
    resetTotalScore: (state) => {
      state.value = 0;
    },
  },
});

export const { increaseTheScore, resetTotalScore } = totalScoreSlice.actions;
export default totalScoreSlice.reducer;
