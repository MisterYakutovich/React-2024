import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Action, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
//
//function isHydrateAction(action: Action): action is PayloadAction<RootState> {
// return action.type === HYDRATE
//}
//
export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api/people/',
  }),
  //
  // extractRehydrationInfo(action, { reducerPath }): any {
  //   if (isHydrateAction(action)) {
  //    return action.payload[reducerPath]
  //  }
  //  },
  //
  endpoints: (builder) => ({
    getPeople: builder.query({
      query: (page) => `?page=${page}`,
    }),
    getPeopleId: builder.query({
      query: (id) => `${id}/`,
    }),
    getSearch: builder.query({
      query: (name) => `?search=${name}`,
    }),
  }),
});
export const { useGetPeopleQuery, useGetPeopleIdQuery, useGetSearchQuery } =
  peopleApi;
// export endpoints for use in SSR
export const { getPeople, getPeopleId, getSearch } = peopleApi.endpoints;
