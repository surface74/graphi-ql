import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRequest } from '../common-types/schema.types';
import INTROSPECION_QUERY from '../Components/Endpoint/Introspection';
import { IRequestData } from '../common-types/request-data';
import { IRequestHeaders } from './rtk-api.types';

export const rtkqApi = createApi({
  reducerPath: 'graphiQl',
  baseQuery: fetchBaseQuery(),
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

    fetchGrathQl: builder.query<ApiRequest, IRequestData>({
      query: ({ baseUrl, query, variables, requestHeaders }) => {
        const parsedHeaders = JSON.parse(
          requestHeaders || '{}'
        ) as IRequestHeaders;

        const headers = {
          'Content-Type': 'application/json',
          ...parsedHeaders,
        };
        console.log('headers: ', headers);

        return {
          url: `${baseUrl}`,
          method: 'POST',
          headers,
          body: { query, variables, requestHeaders },
        };
      },
    }),
  }),
});

export const {
  useFetchSchemaQuery,
  useFetchGrathQlQuery,
  useLazyFetchGrathQlQuery,
} = rtkqApi;
