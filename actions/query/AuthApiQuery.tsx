import baseApi from "~/actions/query/BaseApi";

export const authApiQuery = baseApi.injectEndpoints({
    overrideExisting:true,

    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials:any) => {

                return {
                    url: '/authentication/register',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify(credentials),
                }
            },
        }),
        requestOtp:builder.mutation({
            query: (email:string) => {
                return {
                    url: `/auth/register/request-otp/${email}`,
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },

                }
            },
        }),

        login: builder.mutation({
            query: (credentials) => {
                return {
                    url: '/admin/login',
                    method: 'POST',

                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },

                    body: JSON.stringify(credentials),
                }
            }
        }),
    }),
})

export const { useRegisterMutation,useRequestOtpMutation,useLoginMutation, } = authApiQuery;