import { useMutation } from '@tanstack/react-query';
import {  MutationFunction } from '@tanstack/react-query';
import {GET_TOKEN} from "~/actions/storage";
import { useState, useEffect, useCallback } from 'react';
import { useGetCSMessagesQuery } from '~/actions/query/ChatRoomApi';
import { useSubscription } from "~/actions/UseWebsocket";
import { RootState } from '~/store';
import { useSelector, useDispatch } from 'react-redux';
import { removeAQueue } from '~/actions/query/MessageSlice';

// Define a type for the data parameter
interface Data {
    // Example properties, adjust according to your actual data structure
    exampleProperty?: string;
}

// Define a type for the config parameter
interface Config {
    headers?: Record<string, string>;
}

// Define the custom mutation hook
const useCustomMutation = (
    mutationFn: MutationFunction<Data, unknown>,
    options?: any
) => {
    // Wrap the mutation function to add the token to the headers
    const wrappedMutationFn = async (data: Data) => {
        const token=GET_TOKEN()
        const config: Config = {
            headers: {
                Authorization: `Bearer ${token}`, // Assuming the token is part of the data
            },
        };
        // @ts-ignore
        return mutationFn(data, config);
    };

    // @ts-ignore
    const result = useMutation(wrappedMutationFn, options);

    // Expose additional hooks for error handling and loading state
    return {
        ...result,
        isLoading: result.isPending,
        isError: result.isError,
        error: result.error,
    };
};

export default useCustomMutation;


export const useMessages = (receiverId: string) => {
    const [page, setPage] = useState(0);
    const [allMessages, setAllMessages] = useState<any[]>([]);
    const { data, isFetching } = useGetCSMessagesQuery(
        { chatId: `${receiverId}_CS`, page, limit: 12 },

    );

    const { messages } = useSubscription(`/user/${receiverId}_CS/messages`);
    console.log(messages);
    
    const queueMessage = useSelector((state: RootState) => state.messages.queueMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data?.messages) {
            setAllMessages(prevMessages => [...data.messages, ...prevMessages]);
        }
    }, [data]);

    useEffect(() => {
        if (messages.length > 0) {
            setAllMessages(prevMessages => [...prevMessages, ...messages]);
        }
    }, [messages]);

    const handleScroll = useCallback((container: HTMLDivElement | null) => {
        if (container && page < data?.totalPages && container.scrollTop === 0) {
            setPage(prevPage => prevPage + 1);
        }
    }, [page, data?.totalPages]);

    const isTempIdMatched = (queueTempId: number, content: string, messages: any[]): boolean => {
        const matchedMessageIndex = messages.findIndex(message => message.tempId === queueTempId && message.content === content && message.receiverId === receiverId);
        if (matchedMessageIndex !== -1) {
            dispatch(removeAQueue(queueTempId));
            return true;
        }
        return false;
    };

    return {
        allMessages,
        queueMessage,
        isFetching,
        handleScroll,
        isTempIdMatched,
    };
}