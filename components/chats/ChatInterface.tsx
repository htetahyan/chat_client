'use client'
import React, { useRef } from 'react';
import { useMessages } from '~/actions/CustomQueryHooks';
import MessageList from './MessageList';
import { ChatInterfaceProps } from './type';

const ChatInterface: React.FC<ChatInterfaceProps> = ({ receiverId }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const {
        allMessages,
        queueMessage,
        isFetching,
        handleScroll,
        isTempIdMatched,
    } = useMessages(receiverId);

    return (
        <MessageList
            messages={allMessages}
            queueMessage={queueMessage}
            receiverId={receiverId}
            isTempIdMatched={isTempIdMatched}
            containerRef={containerRef}
            chatEndRef={chatEndRef}
            handleScroll={handleScroll}
            isFetching={isFetching}
        />
    );
};

export default ChatInterface;
