import React from 'react'
import NameModal from '../components/NameModal'
import { useMultiplayer } from '../context/MultiplayerContext'
import SocketComponent from '../components/SocketComponent';

const Multiplayer = () => {

    // socket connection

    // socket connection

    const playerContext = useMultiplayer();
    console.log(playerContext)

    return (
        <>
            {(playerContext.user.user_name == null || playerContext.user.uid == null) && <NameModal />}
            <SocketComponent />
        </>
    )
}

export default Multiplayer