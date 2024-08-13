import {Button, Input, Textarea} from "@nextui-org/react";
import {Send_icon} from "~/utils/exporter";
import {PaperPlaneIcon} from "@radix-ui/react-icons";
import ChatInterface from "~/components/chats/ChatInterface";
import SendMessage from "~/components/chats/SendMessage";
import store from "~/store";
import BaseApi from "~/actions/query/BaseApi";
import {chatRoomApi} from "~/actions/query/ChatRoomApi";
import ChatDocs from "~/components/chats/ChatDocs";
import { ChatHead } from "~/components/chats/ChatHead";

export default function Page({ params }: { params: { userId: string } }) {
store.dispatch(chatRoomApi.endpoints.getCSMessages.initiate({ chatId: `${params.userId}_CS`, page: 0, limit: 25 }))
    return (
    <div className="w-[75vw] h-full flex max-h-screen overflow-hidden relative">  <div className={'h-full w-[40vw]'}>
            <ChatHead receiverId={parseInt(params?.userId)}/>
            <main className={'h-[75vh] p-4 bg-gray-100'}>
                  <ChatInterface receiverId={params.userId}/>
            </main>
            <SendMessage receiverId={parseInt(params.userId)}/>
        </div>
        <ChatDocs receiverId={parseInt(params?.userId)}/>
        </div>
    );
}
