import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PeopleArray } from '../../types/types';

export interface CharactersState {
  selectedCharacters: PeopleArray[];
  // isChecked: boolean;
}
const initialState: CharactersState = {
  selectedCharacters: [],
  // isChecked: false,
};

export const itemsDetailsSlice = createSlice({
  name: 'itemsDetails',
  initialState,
  reducers: {
    setSelectedCharacters(state, action: PayloadAction<PeopleArray[]>) {
      state.selectedCharacters = action.payload;
    },
    unselectAllItems(state) {
      state.selectedCharacters = [];
    },
    // setIsChecked(state, action: PayloadAction<boolean>) {
    // state.isChecked = action.payload;
    // },
  },
});

export const { setSelectedCharacters, unselectAllItems } =
  itemsDetailsSlice.actions;
export default itemsDetailsSlice.reducer;
