import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PeopleArray } from '../../types/types';

export interface CharactersState {
  selectedCharacters: PeopleArray[];
}
const initialState: CharactersState = {
  selectedCharacters: [],
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
  },
});

export const { setSelectedCharacters, unselectAllItems } =
  itemsDetailsSlice.actions;
export default itemsDetailsSlice.reducer;
