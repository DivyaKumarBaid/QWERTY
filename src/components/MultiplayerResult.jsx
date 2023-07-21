import React from 'react'
import { useMultiplayer } from '../context/MultiplayerContext'

const MultiplayerResult = (props) => {

    const playerContext = useMultiplayer();

    let unChangedErrors = 0;
    props.testCorrect.forEach(item => {
        if (!item)
            unChangedErrors += 1;
    })

    const keys = [];
    for (const key in playerContext.playerScore) {
        // console.log(key);
        keys.push(key)
    }

    //

    const grossWpm = props.keyStrokes / 5 / (playerContext.setting.duration / 60);
    const WPM = Math.max(0, grossWpm - (unChangedErrors / (playerContext.setting.duration / 60)));

    // Calculate accuracy
    const acc = Math.max(0, ((props.keyStrokes - props.totalError) / props.keyStrokes) * 100);

    return (
        <div className='flex flex-col items-center gap-8'>
            <div className='flex gap-16 items-center'>
                {keys.map((playerId) => {
                    return (
                        <div key={playerId} className='w-[100%] mb-8 gap-4 font-["Chakra_Petch"] flex flex-col items-center relative'
                            style={{ top: (-playerContext.playerScore[playerId].score / 2) + "px" }}
                        >
                            <div>{Math.round(playerContext.playerScore[playerId].score)}</div>
                            <img
                                src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${playerId}&backgroundColor=b6e3f4&flip=true`} alt="" className='w-[8vw] rounded-[50%] cursor-pointer shadow transition-all duration-[0.5s]'

                            />
                        </div>
                    )
                })}
            </div>
            <div className='flex gap-16 items-center'>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='text-2xl opacity-50 tracking-widest font-["Chakra_Petch"] font-extrabold'>WPM</div>
                    <div className='text-3xl tracking-widest font-["Chakra_Petch"] font-extrabold text-[var(--theme-font-color)]'>{Math.round(WPM)}</div>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='text-2xl opacity-50 tracking-widest font-["Chakra_Petch"] font-extrabold'>Raw</div>
                    <div className='text-3xl tracking-widest font-["Chakra_Petch"] font-extrabold text-[var(--theme-font-color)]'>{Math.round(grossWpm)}</div>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='text-2xl opacity-50 tracking-widest font-["Chakra_Petch"] font-extrabold'>ACC</div>
                    <div className='text-3xl tracking-widest font-["Chakra_Petch"] font-extrabold text-[var(--theme-font-color)]'>{Math.round(acc)}%</div>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='text-2xl opacity-50 tracking-widest font-["Chakra_Petch"] font-extrabold'>Test Time</div>
                    <div className='text-3xl tracking-widest font-["Chakra_Petch"] font-extrabold text-[var(--theme-font-color)]'>{playerContext.setting.duration}</div>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='text-2xl opacity-50 tracking-widest font-["Chakra_Petch"] font-extrabold'>Errors</div>
                    <div className='text-3xl tracking-widest font-["Chakra_Petch"] font-extrabold text-[var(--theme-font-color)]'>{unChangedErrors}</div>
                </div>
                {/* <div className='flex flex-col gap-2 items-center'>
                    <div className='text-2xl opacity-50 tracking-widest font-["Chakra_Petch"] font-extrabold'>Char</div>
                    <div className='text-3xl tracking-widest font-["Chakra_Petch"] font-extrabold text-[var(--theme-font-color)]'>{}%</div>
                </div> */}
            </div>
        </div>
    )
}

export default MultiplayerResult