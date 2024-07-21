import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CharactersState {
  selectedCharacters: string[];
}
const initialState: CharactersState = {
  selectedCharacters: [],
};

export const itemDetailsSlice = createSlice({
  name: 'itemDetails',
  initialState,
  reducers: {
    setSelectedCharacters(state, action: PayloadAction<string[]>) {
      state.selectedCharacters = action.payload;
    },
  },
});
export const { setSelectedCharacters } = itemDetailsSlice.actions;
export default itemDetailsSlice.reducer;
