    import BaseApi from "~/actions/query/BaseApi";

    export const chatRoomApi=BaseApi.injectEndpoints({
        overrideExisting:true,
        endpoints:(builder)=> ({
          getCSChatRoom:builder.query({
              query:() =>{
                  return{
                      url:"/users/chatrooms/customer-service",method:"GET"
                  }
              }
          }),
            getCSMessages:builder.query({
                query:({chatId,page,limit}:{
                    chatId:string,page:number,limit:number
                })=>({
                      url:`/users/messages/${chatId}`,
                    params:{page,size:limit},
                    method:'GET'
                })
            }),
            sendToUser:builder.mutation<any,any>({
                query:(data)=>({
                    url:'/users/messages/send',
                    method:'POST',
                    headers:{
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body:JSON.stringify(data)
                })

            }),
            SendFileToUser:builder.mutation<any,any>({
                query:(data)=>({
                    url:'/users/messages/send/file',
                    method:'POST',

                    body:data,

                }),
    invalidatesTags:['FILE']
            }),
            getFilesFromUser:builder.query({
                query:({chatId,page,limit}:{
                    chatId:string,page:number,limit:number
                })=>({
                    url:`/messages/file/${chatId}`,
                    params:{page,size:limit},
                    method:'GET'
                }),
                providesTags:['FILE']
            })
        })
    })
    export const {useGetCSChatRoomQuery,useGetCSMessagesQuery,useSendToUserMutation,useSendFileToUserMutation,useGetFilesFromUserQuery}=chatRoomApi