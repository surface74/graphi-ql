import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRequest } from '../common-types/schema.types';
import INTROSPECION_QUERY from '../Components/Endpoint/Introspection';
import { IRequestHeaders, IRequestData } from './rtk-api.types';

export const rtkqApi = createApi({
  reducerPath: 'graphiQl',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    fetchSchema: builder.query<ApiRequest, IRequestData>({
      query: ({ baseUrl, proxy }) => {
        if (!proxy) {
          return {
            url: `${baseUrl}`,
            method: 'POST',
            body: {
              operationName: 'IntrospectionQuery',
              query: INTROSPECION_QUERY,
            },
          };
        }

        return {
          url: import.meta.env.VITE_PROXY,
          method: 'POST',
          body: {
            endpoint: baseUrl,
            operationName: 'IntrospectionQuery',
            query: INTROSPECION_QUERY,
          },
        };
      },
    }),

    fetchGrathQl: builder.query<ApiRequest, IRequestData>({
      query: ({ baseUrl, query, variables, requestHeaders, proxy }) => {
        const parsedHeaders = JSON.parse(
          requestHeaders || '{}'
        ) as IRequestHeaders;

        const headers = {
          ...parsedHeaders,
        };

        if (!proxy) {
          const parsedVariables = JSON.parse(
            variables || '{}'
          ) as IRequestHeaders;

          return {
            url: `${baseUrl}`,
            method: 'POST',
            headers,
            body: { query, variables: parsedVariables },
          };
        }

        return {
          url: import.meta.env.VITE_PROXY,
          method: 'POST',
          body: {
            endpoint: baseUrl,
            query,
            variables,
            requestHeaders: JSON.stringify(headers),
          },
        };
      },
    }),
  }),
});

export const {
  useFetchSchemaQuery,
  useFetchGrathQlQuery,
  useLazyFetchGrathQlQuery,
  useLazyFetchSchemaQuery,
} = rtkqApi;
