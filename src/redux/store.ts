import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

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
//setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
