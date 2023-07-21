import React from 'react'
import NameModal from '../components/NameModal'
import { useMultiplayer } from '../context/MultiplayerContext'
import SocketComponent from '../components/SocketComponent';
import ModeChoice from '../components/ModeChoice';
import { io } from 'socket.io-client';
const socket = io.connect(import.meta.env.VITE_API_URL);

const Multiplayer = () => {

    // socket connection
    React.useEffect(() => {
        // Replace 'http://your-server-address' with the address of your server handling socket connections.

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

        // my events
        socket.on('connect_error', (err) => console.log(err))

        socket.on('assigned-room', (data) => console.log(data))

        // Clean up the socket connection when the component unmounts.
        return () => {
            socket.disconnect();
        };
    }, []);

    const joinLobby = () => {
        console.log("in Join")
        socket.emit('get-info', {
            username: playerContext.user.user_name,
            id: playerContext.user.uid,
            mode: playerContext.setting.mode,
        })
        playerContext.setStateOfGame(1);
    }
    // socket connection

    const playerContext = useMultiplayer();

    return (
        <div className='w-[100%] h-[100%] flex items-center justify-center'>
            {(playerContext.user.user_name == null || playerContext.user.uid == null) && <NameModal />}
            {/* <SocketComponent /> */}
            <ModeChoice joinLobby={joinLobby} />
        </div>
    )
}

export default Multiplayer