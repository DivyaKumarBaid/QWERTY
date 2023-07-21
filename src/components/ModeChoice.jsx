import React from 'react'
import { io } from 'socket.io-client';
import { useMultiplayer } from '../context/MultiplayerContext';

const ModeChoice = (props) => {

    const playerContext = useMultiplayer();

    return (
        <div className={`border-[rgba(255,255,255,0.2)] absolute top-[15%] transition-all duration-[0.5s] border py-2 px-4 rounded-3xl bg-[rgba(36,36,36)] shadow-md font-['Josefin_Sans'] flex gap-4 items-center`}>
            {
                playerContext.stateOfGame == 0 &&
                <>
                    <div className={`opacity-50 cursor-pointer text-md font-bold ${playerContext.setting.mode == 0 ? 'text-[var(--theme-font-color)] !opacity-100' : 'text-white'} hover:opacity-100 transition-all duration-[0.3s]`} onClick={() => {
                        playerContext.setSetting(old => ({ ...old, mode: 0 }))
                    }} >
                        Easy
                    </div>

                    <div className={`opacity-50 cursor-pointer text-md font-bold ${playerContext.setting.mode == 1 ? 'text-[var(--theme-font-color)] !opacity-100' : 'text-white'} hover:opacity-100 transition-all duration-[0.3s]`} onClick={() => {
                        playerContext.setSetting(old => ({ ...old, mode: 1 }))
                    }} >
                        Medium
                    </div>

                    <div className={`opacity-50 cursor-pointer text-md font-bold ${playerContext.setting.mode == 2 ? 'text-[var(--theme-font-color)] !opacity-100' : 'text-white'} hover:opacity-100 transition-all duration-[0.3s]`} onClick={() => {
                        playerContext.setSetting(old => ({ ...old, mode: 2 }))
                    }} >
                        Hard
                    </div>

                    <span className='opacity-50'>|</span>

                    <div
                        className='opacity-50 cursor-pointer text-md font-bold hover:opacity-100 transition-all duration-[0.3s]'
                        onClick={() => props.joinLobby()}
                    >
                        Join
                    </div>

                </>
            }
            {
                playerContext.stateOfGame == 1 &&
                <>
                    {/* <span className='opacity-50'>|</span> */}
                    <div className='opacity-50 cursor-pointer text-md font-bold hover:opacity-100 transition-all duration-[0.3s]'>Leave</div>

                </>
            }

        </div>
    )
}

export default ModeChoice