import BaseApi from "~/actions/query/BaseApi";

export const usersApi=BaseApi.injectEndpoints({
    overrideExisting:true,
    endpoints:(builder)=> ({
        getUsersList:builder.query({
            query:({page,name,role,status}) =>{
                return{
                    url:"/CS/users",
                    method:"GET",
                    params:{page,name,role,status}

                }
            }
        }),

    })
})
export const {useGetUsersListQuery}= usersApi