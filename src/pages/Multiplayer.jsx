import React from 'react'
import NameModal from '../components/NameModal'
import { useMultiplayer } from '../context/MultiplayerContext'
import ModeChoice from '../components/ModeChoice';
import MultiplayerPlayground from '../components/MultiplayerPlayground';


const Multiplayer = () => {



    const playerContext = useMultiplayer();

    return (
        <div className='w-[100%] h-[100vh] flex items-center justify-center'
            onMouseMoveCapture={() => {
                playerContext.setIsTyping(false);
                document.body.style.cursor = 'default'
            }}
        >
            {(playerContext.user.user_name == null || playerContext.user.uid == null) && <NameModal />}
            <ModeChoice />
            <MultiplayerPlayground />
        </div>
    )
}

export default Multiplayer