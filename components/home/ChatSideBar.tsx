'use client';
import React from 'react';
import {useGetCSChatRoomQuery} from '~/actions/query/ChatRoomApi';
import {PersonIcon} from '@radix-ui/react-icons';
import Link from "next/link";
import { Avatar, Input, User } from '@nextui-org/react';

interface Room {
    id: number;
    name: string;
    chatId: string;
    userId: number;
    userName: string;
    latestMessage: string;
    avatarUrl?: string;  // Assuming avatarUrl is optional
}

const ChatSideBar = () => {
    const {data} = useGetCSChatRoomQuery(0, {pollingInterval: 100000});
    return (
        <div className="w-[15vw] h-full bg-gray-50 p-4 border-r border-gray-200">
           <div className='mb-6'><h1 className="text-lg font-semibold mb-4 text-gray-700">Messages</h1>
            <Input type='search'  color="default" size="lg" placeholder="Search users" />
            </div> 
            <div className="space-y-2">
                {data?.map((room: Room, i:number) => (
                    <Link key={i} href={`/chats/${room.userId}`}>
                    <div key={i} className="p-2 bg-white rounded shadow flex items-center space-x-2">
                        {room.avatarUrl ? (
                            <Avatar
                                src={room.avatarUrl}
                                alt={room.userName ?? 'User Avatar'}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <User
                            avatarProps={{radius: "lg"}}
                           
                            name={room.userName ?? 'User Name'}
                            description={room.latestMessage}
                            classNames={{
                                description: 'text-md text-gray-500 ',
                            }}
                          >
                            
                          </User>
                        )}
                    
                    </div></Link>
                ))}
            </div>
        </div>
    );
};

export default ChatSideBar;
