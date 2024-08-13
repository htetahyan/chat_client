import BaseApi from "~/actions/query/BaseApi";

export const generalApiQuery=BaseApi.injectEndpoints({
    overrideExisting:true,
    endpoints:(builder)=> ({
        createSnippet: builder.mutation({
            query: (data) => {
                return {
                    url: '/CS/snippets/create',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            },
        }),
        getAllSnippet: builder.query<any, any>({
            query: () => {
                return {
                    url: `/CS/snippets`,
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },

                }
            },
        })
    })
})
export const { useCreateSnippetMutation,useGetAllSnippetQuery}=generalApiQuery
