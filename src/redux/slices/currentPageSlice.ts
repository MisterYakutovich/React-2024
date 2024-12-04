import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CurrentPageState {
  currentPage: number;
}
const initialState: CurrentPageState = {
  currentPage: 1,
};
export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});
export const { setCurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
