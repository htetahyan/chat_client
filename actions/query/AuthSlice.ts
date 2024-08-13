import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState} from '~/store'
import { authApiQuery} from "~/actions/query/AuthApiQuery";
import {GET_TOKEN, REMOVE_TOKEN, SET_TOKEN} from "~/actions/storage";

const initialState = {
    user: GET_TOKEN() || null,
    token: GET_TOKEN() || null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<any>) => {
            const {  token ,refreshToken} = action.payload;

            state.token = token;

            SET_TOKEN(token);
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;

            REMOVE_TOKEN();
        },
        setUser:(state,action:PayloadAction<any>)=>{

        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApiQuery.endpoints.login.matchFulfilled,
            (state, action: PayloadAction<any>) => {
                const {  token } = action.payload;

                state.token = token;

                SET_TOKEN(token);
            }
        )
    },
});

export const { setCredentials, logOut,setUser } = authSlice.actions;
export default authSlice.reducer;

export const currentUser = (state: RootState) => state.auth.user;
export const currentToken = (state: RootState) => state.auth.token;