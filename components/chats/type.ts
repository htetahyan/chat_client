export interface ChatInterfaceProps {
    receiverId: string;
}

export interface MessageProps {
    id: number;
    tempId: string;
    content: string;
    senderId: string;
    receiverId: string;
    type: string;
    url?: string;
}

export interface QueueMessageProps {
    tempId: number;
    content: string;
}
