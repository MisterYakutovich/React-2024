import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { peopleApi } from './services/api_people';
import stateItemDetails from './slices/itemsDetailsSlice';
import stateCurrentPage from './slices/currentPageSlice';
import stateItemsCurrentPage from './slices/itemsCurrentPageSlice';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () =>
  configureStore({
    reducer: {
      [peopleApi.reducerPath]: peopleApi.reducer,
      itemsDetails: stateItemDetails,
      currentPage: stateCurrentPage,
      itemsCurrentPage: stateItemsCurrentPage,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(peopleApi.middleware),
  });

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
export const wrapper = createWrapper<RootStore>(makeStore, {
  debug: true,
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state),
});
