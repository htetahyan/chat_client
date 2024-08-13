import React, { useEffect, useRef, useState } from 'react';

export const useSubscription = (destination:String) => {
    const [messages, setMessages] = useState([]);
    const workerRef = useRef<any>(null);

    useEffect(() => {
        workerRef.current = new SharedWorker(new URL('/public/websocket-worker.js', import.meta.url));

        workerRef.current.port.onmessage = (event:any) => {
            if (event.data.type === 'message' && event.data.destination === destination) {
                // @ts-ignore
                setMessages((prev:any) => [...prev, JSON.parse(event.data.body)]);
            }
        };

        workerRef.current.port.postMessage({ type: 'subscribe', destination });

        return () => {
            workerRef.current.port.postMessage({ type: 'unsubscribe', destination });
        };
    }, [destination]);

    return { messages };
};
export const useUnscribe = (destination:String) => {
    const workerRef = useRef<any>(null);
    useEffect(() => {
        workerRef.current = new SharedWorker(new URL('/public/websocket-worker.js', import.meta.url));
        workerRef.current.port.onmessage = (event:any) => {
            if (event.data.type === 'unsubscribe' && event.data.destination === destination) {
                workerRef.current.port.close();
            }
        };
        workerRef.current.port.postMessage({ type: 'unsubscribe', destination });   

        return () => {
            workerRef.current.port.postMessage({ type: 'unsubscribe', destination });
        };
    }, [destination]);

}