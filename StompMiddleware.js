import { Client } from '@stomp/stompjs';

export const stompMiddleware = ({ dispatch }) => {
    const client = new Client({
        brokerURL: 'ws://localhost:8080/api/v1/secret/ws',
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 1000,
        heartbeatIncoming: 1000,
        heartbeatOutgoing: 1000,
    });

    client.onConnect = function (frame) {
        client.publish({ destination: "/app/users/chatrooms/customer-service" });

        client.subscribe('/topic/customer-service/chatrooms', (message) => {
            if (message.body) {
                dispatch(addMessage(message.body));
            } else {
                console.log('got empty message');
            }
        });

        client.onStompError = function (frame) {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
    };

    return next => action => {
        switch (action.type) {
            case 'connect':
                client.activate();
                break;
            case 'disconnect':
                client.deactivate();
                break;
            default:
                return next(action);
        }
    };
};