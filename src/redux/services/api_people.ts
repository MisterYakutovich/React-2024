import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api/people/',
  }),
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
export const { getPeople, getPeopleId, getSearch } = peopleApi.endpoints;
