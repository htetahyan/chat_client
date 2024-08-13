import React, { useState, useEffect, useRef, useCallback } from 'react';
import { create } from 'zustand'

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const topRef = useRef(null);

    const fetchMessages = async (page) => {
        const response = await fetch(`http://localhost:8080/api/v1/users/messages/2_1?page=${page}&size=10`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwOTg5NSIsImlhdCI6MTcyMTk2OTA5MiwiZXhwIjoxNzIyMzE0NjkyfQ.3pB-e09UEMDqOaN3uHNo8hVkzabu_O7IE8cLRysomOVtrwOFqFRoW_6pczwu48RHFxPrFb1kr0vwlfWnvBLRIQ"
            }
        });
        const newMessages = await response.json();
        if (newMessages.length > 0) {
            // Append new messages at the beginning
            setMessages(prevMessages => [...newMessages, ...prevMessages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
        } else {
            setHasMore(false);
        }
    };

    useEffect(() => {
        fetchMessages(page);
    }, [page]);

    const handleScroll = useCallback(() => {
        if (topRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasMore) {
                        setPage(prevPage => prevPage + 1);
                    }
                },
                { threshold: 1 }
            );
            observer.observe(topRef.current);

            return () => {
                if (topRef.current) {
                    observer.unobserve(topRef.current);
                }
            };
        }
    }, [hasMore]);

    useEffect(() => {
        handleScroll();
    }, [handleScroll]);

    return (
        <div>
            <div ref={topRef}></div>
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Messages;
