import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query"
import { logOut, setCredentials } from "./AuthSlice"
import {RootState} from "~/store";



/* import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { logOut } from './AuthSlice';


const baseUrl = `http://localhost:8082/api`;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if ((result.error?.data as any)?.message === 'You are not logged in') {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { credentials: 'include', url: '/v1/auth/authenticate' },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
          window.location.href = '/login';
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

 */
type prepareHeaders = (
    headers: Headers,
    api: {
        getState: () => unknown
        extra: unknown
        endpoint: string
        type: 'query' | 'mutation'
        forced: boolean | undefined
    }
) => Headers | void

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1',

    prepareHeaders: (headers, { getState }) => {

        const token = (getState() as RootState).auth.token;

        if (token) {

            headers.set('Authorization', `Bearer ${token}`);
        }


        return headers;
    }
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result:any = await baseQuery(args, api, extraOptions);

    if(result.error?.error && result.error.originalStatus!==200){
        /*  alert(result.error.data) */
    }
    if (result.error?.status === 401) {
        // Handle reauthentication logic here if necessary
        // For example, you can refresh the token and retry the request
    }

    return result;
};