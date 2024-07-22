import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CharactersState {
  selectedCharacters: string[];
}
const initialState: CharactersState = {
  selectedCharacters: [],
};

export const itemsDetailsSlice = createSlice({
  name: 'itemsDetails',
  initialState,
  reducers: {
    setSelectedCharacters(state, action: PayloadAction<string[]>) {
      state.selectedCharacters = action.payload;
    },
  },
});

export const { setSelectedCharacters } = itemsDetailsSlice.actions;
export default itemsDetailsSlice.reducer;
