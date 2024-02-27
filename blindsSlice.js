import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  raiseBlindInterval: 3,
  isRaiseBlind: false,
  startTimeMinute: 3,
  startTimeSecond: 0,
  blind1: 1,
  blind2: 2,
  sliderStep: 2,
  sliderNumberOfSteps: 3,
};

const blindsSlice = createSlice({
  name: 'blindsSlice',
  initialState,
  reducers: {
    changeInterval(state, action) {
      state.raiseBlindInterval = action.payload;
    },
    blindChangeState(state) {
      state.isRaiseBlind = !state.isRaiseBlind;
    }
  }
});

export const { changeInterval, blindChangeState } = blindsSlice.actions;

export default blindsSlice.reducer;