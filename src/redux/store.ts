import { configureStore } from '@reduxjs/toolkit';

import stateItemDetails from './slices/itemsDetailsSlice';
import stateCurrentPage from './slices/currentPageSlice';
import stateItemsCurrentPage from './slices/itemsCurrentPageSlice';

export const store = configureStore({
  reducer: {
    itemsDetails: stateItemDetails,
    currentPage: stateCurrentPage,
    itemsCurrentPage: stateItemsCurrentPage,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
