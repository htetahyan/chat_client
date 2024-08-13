'use client';

import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import {Client, Stomp} from '@stomp/stompjs';
import './WebSocketChat.css';
import Messages from "~/app/(page)/chats/components/Messages";
import {headers} from "next/headers";

const WebSocketChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [receiver_id, setReceiverId] = useState<any>(2);
    const stompClientRef = useRef(null);
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwOTg5NSIsImlhdCI6MTcyMjQwOTgxOCwiZXhwIjoxNzgxNzQ0NDg0fQ.05qnYUm45BayWL2rcY_w1J0QRNlE0MzYUf_yoTepG5HHB76fvzLjLgEOMT1LoPmgwK3FphOiomX659AUO9RjcQ";
    const userSecondToken="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwIiwiaWF0IjoxNzIxOTY0OTk3LCJleHAiOjE3MjIzMTA1OTd9.213DRIMmrf_Z0joWaUdUpXM-aOy0gZMvmgFBBT0SQ7ys2xpqok6ajsESPuHb9bDgPuH4N1GNQQNbRl6NjSC5ew";

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/api/v1/secret/ws',
            );
/*
let stompClient=Stomp.over(socket)
        stompClient.connect({Authorization: `Bearer ${token}`},(frame)=>{
            console.log('Connected to WebSocket');

            stompClient.subscribe('/user/2_1/messages', (message) => {
                const receivedMessage = JSON.parse(message.body);
                console.log(receivedMessage);

                setMessages((prevMessages) => {
                    const updatedMessages = prevMessages.map(msg =>
                        msg.tempId === receivedMessage.tempId ? { ...msg, ...receivedMessage, status: 'SENT' } : msg
                    );
                    return updatedMessages;
                });
            });
        })*/


        // @ts-ignore
      let stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,

            onConnect: ((frame) => {
                console.log('Connected to WebSocket');

                stompClient.subscribe('/user/1_CS/messages', (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    console.log(receivedMessage, "received",message);

                    setMessages((prevMessages) => {
                        const updatedMessages = prevMessages.map(msg =>
                            msg.tempId === receivedMessage.tempId ? { ...msg, ...receivedMessage, status: 'SENT' } : msg
                        );
                        return updatedMessages;
                    });
                });
            }),

            onStompError: (frame) => {
                console.error(`Broker reported error: ${frame.headers['message']}`);
                console.error(`Additional details: ${frame.body}`);
            },
            onWebSocketClose: (event) => {
                console.log('WebSocket closed', event);
            },
            onWebSocketError: (error) => {
                console.error('WebSocket error', error);
            }
        });

        stompClient.activate();


        stompClientRef.current = stompClient;

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
            }
        };
    }, []);

    const sendMessage = async () => {
        const tempId = new Date().getTime();
        const message = {
            receiverId: "CS",
            content: inputMessage,
            tempId,

        };
 await fetch("http://localhost:8080/api/v1/users/messages/send",{
     method: "POST",
     headers:{
         "Authorization":`Bearer ${ receiver_id === 2 ? token : userSecondToken}`
         ,"Content-Type":"application/json"
     }     ,body:JSON.stringify(message)
 })
            setInputMessage('');
    }


    return (
        <div className="container">
            <div className="header"> 
                <h1>WebSocket Chat</h1>
            </div>
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.receiverId === 2 ? 'sent' : 'received'} ${msg.status === 'PENDING' ? 'pending' : ''}`}>
                        <strong>{msg.senderId}:</strong> {msg.content} {msg.status === 'PENDING' && '(Pending)'}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="number"
                    value={receiver_id}
                    onChange={(e) => setReceiverId(e.target.value)}
                />
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default WebSocketChat;
