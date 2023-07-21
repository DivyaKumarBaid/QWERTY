// SocketComponent.js
import React, { useEffect } from 'react';
import io from 'socket.io-client';

const SocketComponent = () => {
    useEffect(() => {
        // Replace 'http://your-server-address' with the address of your server handling socket connections.
        const socket = io(import.meta.env.API_KEY);

        // Event listener for 'connect' event.
        socket.on('connect', () => {
            console.log('Socket connected');
            // You can perform actions when the socket connection is established.
        });

        // Event listener for 'message' event.
        socket.on('message', (data) => {
            console.log('Received message:', data);
            // Handle incoming messages from the server.
        });

        // Event listener for 'disconnect' event.
        socket.on('disconnect', () => {
            console.log('Socket disconnected');
            // You can perform actions when the socket connection is closed.
        });

        // Clean up the socket connection when the component unmounts.
        return () => {
            socket.disconnect();
        };
    }, []);

    return <div>Socket Connection Example</div>;
};

export default SocketComponent;
