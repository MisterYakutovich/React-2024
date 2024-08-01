import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { peopleApi } from './services/api_people';
import stateItemDetails from './slices/itemsDetailsSlice';
import stateCurrentPage from './slices/currentPageSlice';
import stateItemsCurrentPage from './slices/itemsCurrentPageSlice';
import { createWrapper } from 'next-redux-wrapper';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [peopleApi.reducerPath]: peopleApi.reducer,
    itemsDetails: stateItemDetails,
    currentPage: stateCurrentPage,
    itemsCurrentPage: stateItemsCurrentPage,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
/*const rootReducer = combineReducers({
  [peopleApi.reducerPath]: peopleApi.reducer,
  itemsDetails: stateItemDetails,
  currentPage: stateCurrentPage,
  itemsCurrentPage: stateItemsCurrentPage,
});
export const setupStore: any = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(peopleApi.middleware),

    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });*/
