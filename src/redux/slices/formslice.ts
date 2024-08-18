import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  firstName: string;
  age: string;
  gender: string;
  email: string;
  password: string;
  photo: string;
}

const initialState: FormState = {
  firstName: '',
  age: '',
  gender: '',
  email: '',
  password: '',
  photo: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updatePhoto: (state, action: PayloadAction<string>) => {
      state.photo = action.payload;
    },
    setFormData(state, action: PayloadAction<FormState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setFormData, updatePhoto } = formSlice.actions;

export default formSlice.reducer;
