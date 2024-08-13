import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { usersApi } from "./UsersApi"

interface User {
    name: string
    phone: string
    status: string
    studentId: string
    role: string

}
const initialState = {
    page: 0,
    users: [] as User[], // Add appropriate type instead of any
    name: null as string | null,
    role: null as string | null,
    status: null as string | null,
    totalPages:0

}
export const usersListSlice = createSlice({
    name: 'usersList',
    initialState,
    reducers: {
   setPage: (state, action: PayloadAction<number>) => {
       state.page = action.payload
   },
   setUsers: (state, action: PayloadAction<User[]>) => {
       state.users = action.payload 
    },
    setName: (state, action: PayloadAction<string>) => {
        state.name = action.payload
    },
    setRole: (state, action: PayloadAction<string>) => {
        
        if (action.payload === "null" || action.payload === undefined || action.payload === "All") {
            state.role = null
        }else{
            state.role = action.payload

        }
        console.log(state.role);
        
    },
setStatus:(state,action:PayloadAction<string>)=>{
    if(action.payload === "null" || action.payload === undefined || action.payload === "All"){
        state.status = null
}else{
    state.status = action.payload
}}

    },
    extraReducers:(builder) => {
       builder.addMatcher(
           usersApi.endpoints.getUsersList.matchFulfilled,
           (state, action: PayloadAction<any>) => {
               state.users = action.payload.users
               state.totalPages = action.payload.totalPages
           }
       )
    },
})
export const {setPage,setUsers,setName,setRole,setStatus} = usersListSlice.actions
export default usersListSlice.reducer