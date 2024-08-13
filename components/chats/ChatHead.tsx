'use client'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import PhoneCallIcon from "~/components/chats/PhoneCallIcon";

export const ChatHead = ({receiverId}: {receiverId: number}) => {

    const router=useRouter()
  return (
    <header className={'bg-white p-4 flex items-center justify-between h-[10vh]'}>
    <Button onClick={() => router.push('/chats')}>
        Back
    </Button>
    <div className={'flex items-center'}>
        <span className={'mr-4 cursor-pointer'}>
            <PhoneCallIcon/>
        </span>
        <span className={'text-gray-500'}>active</span>
    </div>
</header>
  )
}
