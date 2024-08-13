import {
    createApi,

} from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { baseQueryWithReauth } from './CustomBaseQuery';
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,


    tagTypes: ['FILE'],
    endpoints: (builder) => ({

    }),

    // eslint-disable-next-line consistent-return
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            // @ts-ignore
            return action.payload[reducerPath];
        }
    },
});

export default baseApi;
export const { } = baseApi