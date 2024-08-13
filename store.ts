import {combineReducers, configureStore} from "@reduxjs/toolkit";

import { stompReducer } from "./stomp-slice";
import baseApi from "~/actions/query/BaseApi";
import AuthSliceReducer from "~/actions/query/AuthSlice";
import MessageReducer from "~/actions/query/MessageSlice";
import UsersListReducer from "./actions/query/UsersListSlice";

const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        messages:MessageReducer,
        auth:AuthSliceReducer,
        userSlice: UsersListReducer,
        broker: stompReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
