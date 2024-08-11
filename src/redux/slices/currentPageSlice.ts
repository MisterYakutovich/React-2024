import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CurrentPageState {
  currentPage: number;
  totalPages: number;
}
const initialState: CurrentPageState = {
  currentPage: 1,
  totalPages: 0,
};
export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});
export const { setCurrentPage, setTotalPages } = currentPageSlice.actions;
export default currentPageSlice.reducer;
