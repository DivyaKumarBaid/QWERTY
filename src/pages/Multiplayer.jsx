import React from 'react'
import NameModal from '../components/NameModal'
import { useMultiplayer } from '../context/MultiplayerContext'

const Multiplayer = () => {

    const playerContext = useMultiplayer();
    console.log(playerContext)

    return (
        <>
            {(playerContext.user.user_name == null || playerContext.user.uid == null) && <NameModal />}
        </>
    )
}

export default Multiplayer