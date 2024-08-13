import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Message{
   content: string;     receiverId: number;     tempId: number;
   chatId?:string; senderId?:number;
   status: "SENT" | "PENDING",
    timestamp?:any;

}
const initialState = {
    queueMessage: [] as Message[], // Add appropriate type instead of any
    messages: [] as Message[] // Add appropriate type instead of any
};

export const messageSlice = createSlice({
    name: 'messageSlice',
    initialState,
    reducers: {
        addToQueue: (state, action: PayloadAction<Message>) => {
            const queues = action.payload;
            state.queueMessage = [...state.queueMessage, queues];
        },
        addToMessage:(state,action: PayloadAction<Message[]>)=>{
            const messages = action.payload;
            state.messages = [...state.messages, ...messages];
        },
        removeAQueue: (state, action: PayloadAction<number>) => {
            state.queueMessage = state.queueMessage.filter((message) => message.tempId !== action.payload);
        },

    }
});

export const { addToQueue,addToMessage,removeAQueue } = messageSlice.actions;
export default messageSlice.reducer;
