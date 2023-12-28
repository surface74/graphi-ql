import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiRequest } from '../common-types/schema.types';
import INTROSPECION_QUERY from '../Components/Endpoint/Introspection';
import { setApiErrorMessage } from '../store/slices/apiSlice';
import errorMessages from '../assets/errorMessages.json';

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

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        // console.log('starting!');
        let message: string;
        queryFulfilled
          .then((request) => {
            return request;
          })
          .catch((error) => {
            if (Object.hasOwn(error.error, 'status')) {
              if (error.error.status === 404) {
                message = JSON.stringify(errorMessages.ERROR_404);
              }
              if (error.error.status === 'FETCH_ERROR') {
                message = JSON.stringify(errorMessages.ACCSESS_DENIED);
              }
              dispatch(setApiErrorMessage(message));
              // }
            }
          });

        // // let message;
        // try {
        //   const request = await queryFulfilled;
        //   console.log('success!', request);

        //   if (!request) {
        //     // todo ничего не возвращает
        //     message = JSON.stringify(errorMessages.ACCSESS_DENIED);
        //     dispatch(setApiErrorMessage(message));
        //   }
        // } catch (error) {
        //   if (error instanceof Error && 'status' in error) {
        //     // if (Object.hasOwn(error, 'status')) {
        //     console.log('ok');
        //     if (error.status === '404') {
        //       console.log('404');
        //       message = JSON.stringify(errorMessages.ERROR_404);
        //     }
        //     if (error.status === '403') {
        //       console.log('403');
        //       message = JSON.stringify(errorMessages.ACCSESS_DENIED);
        //     }
        //     dispatch(setApiErrorMessage(message));
        //     console.log('error... ', error);
        //     // }
        //   }
        // }
      },
    }),

    // https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-queries-with-queryfn
    // https://codesandbox.io/p/sandbox/rtk-query-onquerystarted-example-nr8cm?file=%2Fsrc%2Fapi.ts%3A16%2C6-30%2C8

    mutateGrathQl: builder.mutation<
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
