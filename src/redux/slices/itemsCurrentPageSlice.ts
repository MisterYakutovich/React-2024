import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PeopleArray } from '../../types/types';

export interface ItemsCurrentPageState {
  items: PeopleArray[];
}
const initialState: ItemsCurrentPageState = {
  items: [],
};
export const itemscurrentPageSlice = createSlice({
  name: 'itemsCurrentPage',
  initialState,
  reducers: {
    setItemsCurrentPage(state, action: PayloadAction<PeopleArray[]>) {
      state.items = action.payload;
    },
  },
});
export const { setItemsCurrentPage } = itemscurrentPageSlice.actions;
export default itemscurrentPageSlice.reducer;
