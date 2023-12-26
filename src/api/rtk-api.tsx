import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRequest } from '../common-types/schema.types';
import INTROSPECION_QUERY from '../Components/Endpoint/Introspection';

export const rtkqApi = createApi({
  reducerPath: 'graphiQl',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    fetchSchema: builder.query<ApiRequest, string>({
      query: (baseUrl) => ({
        url: `${baseUrl}`,
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: {
          operationName: 'IntrospectionQuery',
          query: INTROSPECION_QUERY,
        },
      }),
    }),

    fetchGrathQl: builder.query<
      ApiRequest,
      { baseUrl: string; queryString: string }
    >({
      query: ({ baseUrl, queryString }) => ({
        url: `${baseUrl}`,
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: queryString,
      }),
    }),
  }),
});

export const { useFetchSchemaQuery, useFetchGrathQlQuery } = rtkqApi;
