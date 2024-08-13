// websocket-shared-worker.js
import SockJS from 'sockjs-client';


import {Stomp} from "@stomp/stompjs";
let connections = [];
let stompClient;

function connectWebSocket() {
    console.log('Attempting to connect to WebSocket...');
    const websocket = new SockJS('http://localhost:8080/api/v1/secret/ws');
    stompClient = Stomp.over(websocket);

    stompClient.connect({}, (frame) => {
        console.log('Connected to WebSocket', frame);

        // Subscribe to all the destinations
        connections.forEach(({ port, destination }) => {
            stompClient.subscribe(destination, (msg) => {
                port.postMessage({ type: 'message', destination, body: msg.body });
            });
        });
    }, (error) => {
        console.error('Error connecting to WebSocket:', error);
        setTimeout(connectWebSocket, 1000); // Retry connection every second
    });
}

connectWebSocket();

onconnect = (event) => {
    const port = event.ports[0];
    console.log('New connection established with the main thread.');

    connections.push({ port, destination: null });

    port.onmessage = (event) => {
        const { type, destination } = event.data;

        if (type === 'subscribe') {
            console.log('Subscribing to destination:', destination);
            connections = connections.map(conn => conn.port === port ? { ...conn, destination } : conn);
            if (stompClient && stompClient.connected) {
                stompClient.subscribe(destination, (msg) => {
                    port.postMessage({ type: 'message', destination, body: msg.body });
                });
            }
        } else if (type === 'unsubscribe') {
            console.log('Unsubscribing from destination:', destination);
            connections = connections.filter(conn => conn.port !== port || conn.destination !== destination);
        }
    };

    port.start();
};
