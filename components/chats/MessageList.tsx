import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Checkbox, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { MessagePopoverContent } from './MessagePopoverContent';
import { formatDate, imageTypes } from './utils';
import { MessageProps, QueueMessageProps } from './type';
import { gsap } from 'gsap';

interface MessageListProps {
    messages: MessageProps[];
    queueMessage: QueueMessageProps[];
    receiverId: string;
    isTempIdMatched: (queueTempId: number, content: string, messages: MessageProps[]) => boolean;
    containerRef: React.RefObject<HTMLDivElement>;
    chatEndRef: React.RefObject<HTMLDivElement>;
    handleScroll: (container: HTMLDivElement | null) => void;
    isFetching: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
    messages,
    queueMessage,
    receiverId,
    isTempIdMatched,
    containerRef,
    chatEndRef,
    handleScroll,
    isFetching
}) => {
    const lastDateRef = useRef('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const container = containerRef.current;
        if (container && !isFetching) {
            const onScroll = () => handleScroll(container);
            container.addEventListener('scroll', onScroll);
            return () => {
                container.removeEventListener('scroll', onScroll);
            };
        }
    }, [handleScroll, isFetching]);

  

    useEffect(() => {
        // Check if it's not the initial load and there's a new message in the queue,
        // OR if it's the initial load and there are more than 12 messages already.
        if (!isInitialLoad && queueMessage.length > 0 || (isInitialLoad && messages.length > 12)) {
            if (chatEndRef.current) {
                gsap.fromTo(chatEndRef.current, 
                    { opacity: 0 }, 
                    { 
                        opacity: 1, 
                        duration: 0.5, 
                        onComplete: () => {
                            chatEndRef!.current!.scrollIntoView({ behavior: 'smooth' });
                            setIsInitialLoad(false); // This line ensures that once the animation completes, isInitialLoad is set to false, preventing the effect from running again on subsequent renders without meeting the new criteria.
                        }
                    }
                );
            }
        }
    }, [queueMessage, isInitialLoad, messages.length, chatEndRef]); // Dependencies remain the same as before.



    const sortedData = messages.slice().sort((a, b) => new Date(a.tempId).getTime() - new Date(b.tempId).getTime());
    const removeDuplicates = sortedData.filter((message, index) => index === sortedData.findIndex((m) => m.tempId === message.tempId && m.content === message.content && m.id === message.id )  );
    return (
        <div
            ref={containerRef}
            className="h-full overflow-y-scroll overflow-x-hidden w-full relative p-4 flex flex-col space-y-4 bg-gray-100"
        >
            {isFetching && <h2>Loading...</h2>}
            {removeDuplicates.map((message) => {
                const messageDate = formatDate(message.tempId);
                const showDate = messageDate !== lastDateRef.current;
                lastDateRef.current = messageDate;

                return (
                    <div key={message.id} className='relative'>
                        {showDate && (
                            <div className="text-center text-xs text-gray-500 my-2">
                                {messageDate}
                            </div>
                        )}
                        <div className={`flex w-full ${message?.senderId === receiverId ? 'justify-start' : 'justify-end'}`}>
                            <Popover showArrow placement='right' backdrop='blur' className='w-[300px]'>
                                <PopoverTrigger className="max-w-xs rounded-lg px-4 py-2 bg-white shadow-md mr-3 hover:bg-slate-50 cursor-pointer hover:shadow-md">
                                    <div className='flex w-full' >
                                        <div className='mr-3 w-full'>
                                            {message.type === "text" && <div
                                                className="text-sm text-gray-600 max-w-[90%] break-words text-ellipsis relative whitespace-normal overflow-hidden overflow-wrap break-word">
                                                {message.content}
                                            </div>
                                            }
                                            {imageTypes.includes(message.type) &&
                                                <Image src={message?.url as string} alt='image' height={300}
                                                       width={300}/>}
                                            <div className="text-xs text-gray-400 mt-1 text-right">
                                                {new Date(message.tempId).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                        <Checkbox isDisabled defaultSelected />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="bg-transparent backdrop-blur-lg border-none bg-none">
                                    <MessagePopoverContent id={message.id} type={message.type} />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                );
            })}
            {queueMessage.length > 0 && queueMessage.map((q, i) => (
                !isTempIdMatched(q.tempId, q.content, messages) && (
                    <div key={i} className={`flex justify-end`}>
                        <div className="max-w-xs rounded-lg px-4 py-2 bg-white shadow-md">
                            <div className="text-sm text-gray-600">{q.content}</div>
                        </div>
                        <Checkbox
                            isDisabled
                            isSelected={isTempIdMatched(q.tempId, q.content, messages)}
                        />
                    </div>
                )
            ))}
            {messages.length > 0 && <div className={'h-20 w-20'} ref={chatEndRef}></div>}
        </div>
    );
};

export default MessageList;
