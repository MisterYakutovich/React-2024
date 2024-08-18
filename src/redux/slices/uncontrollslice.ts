import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  name: string;
  age: number;
  gender: string;
  email: string;
  password: string;
  photo: string;
}

const initialState: FormState = {
  name: '',
  age: 0,
  gender: '',
  email: '',
  password: '',
  photo: '',
};

const uncontrollform = createSlice({
  name: 'uncontrollform',
  initialState,
  reducers: {
    unupdatePhoto: (state, action: PayloadAction<string>) => {
      state.photo = action.payload;
    },
    setUnFormData(state, action: PayloadAction<FormState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUnFormData, unupdatePhoto } = uncontrollform.actions;

export default uncontrollform.reducer;
