import { configureStore } from '@reduxjs/toolkit';

import formReducer from './slices/formslice';
import unformReducer from './slices/uncontrollslice';
const store = configureStore({
  reducer: {
    form: formReducer,
    uncontrollform: unformReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
