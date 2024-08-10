import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
//import { peopleApi } from './services/api_people';
import stateItemDetails from './slices/itemsDetailsSlice';
import stateCurrentPage from './slices/currentPageSlice';
import stateItemsCurrentPage from './slices/itemsCurrentPageSlice';

export const store = configureStore({
  reducer: {
    //[peopleApi.reducerPath]: peopleApi.reducer,
    itemsDetails: stateItemDetails,
    currentPage: stateCurrentPage,
    itemsCurrentPage: stateItemsCurrentPage,
  },
  // middleware: (getDefaultMiddleware) =>
  //  getDefaultMiddleware().concat(peopleApi.middleware),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
