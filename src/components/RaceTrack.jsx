import React from 'react'
import { useMultiplayer } from '../context/MultiplayerContext'

const RaceTrack = () => {

    const playerContext = useMultiplayer();

    const keys = [];
    for (const key in playerContext.playerScore) {
        // console.log(key);
        keys.push(key)
    }

    // console.log(keys)

    return (
        <div className='flex flex-col items-center'>
            <div className='text-2xl text-white font-["Chakra_Petch"]'>Track</div>
            <div className='flex flex-col items-start w-[100%] gap-4'>
                {keys.map((playerId) => {
                    return (
                        <div key={playerId} className='relative w-[70vw]'>
                            <img
                                src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${playerId}&backgroundColor=b6e3f4&flip=true`} alt="" className='w-[3vw] rounded-[50%] cursor-pointer shadow relative transition-all duration-[0.5s]'
                                style={{ left: playerContext.playerScore[playerId].score + '%' }}
                            />
                            <div className='absolute top-[50%] z-[-1] bg-[var(--theme-font-color)] opacity-[0.1] w-[100%] h-[0.5vh]'></div>
                            <div className='text-xl font-["Chakra_Petch"] absolute top-[20%] left-[100%]'>{Math.round(playerContext.playerScore[playerId].score)}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RaceTrack