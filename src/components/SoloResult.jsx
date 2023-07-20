import React from 'react'
import { useTyping } from '../context/TypingContext'

const SoloResult = (props) => {

    const typingContext = useTyping();
    const grossWpm = (props.keyStrokes / 5) / (typingContext.setting.duration / 60);
    let unChangedErrors = 0;
    props.testCorrect.forEach(item => {
        if (!item)
            unChangedErrors += 1;
    })

    const WPM = grossWpm - (unChangedErrors / (typingContext.setting.duration / 60));
    const acc = (WPM / grossWpm) * 100;

    return (
        <div className='flex flex-col items-center gap-8'>
            <div className='flex gap-16 items-center'>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='text-[3rem] opacity-50 tracking-widest font-["Chakra_Petch"] font-extrabold'>WPM</div>
                    <div className='text-[3.5rem] tracking-widest font-["Chakra_Petch"] font-extrabold text-[var(--theme-font-color)]'>{Math.round(WPM)}</div>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='text-[3rem] opacity-50 tracking-widest font-["Chakra_Petch"] font-extrabold'>Raw</div>
                    <div className='text-[3.5rem] tracking-widest font-["Chakra_Petch"] font-extrabold text-[var(--theme-font-color)]'>{Math.round(grossWpm)}</div>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='text-[3rem] opacity-50 tracking-widest font-["Chakra_Petch"] font-extrabold'>ACC</div>
                    <div className='text-[3.5rem] tracking-widest font-["Chakra_Petch"] font-extrabold text-[var(--theme-font-color)]'>{Math.round(acc)}%</div>
                </div>
            </div>
            <div className='flex gap-16 items-center'>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='text-2xl opacity-50 tracking-widest font-["Chakra_Petch"] font-extrabold'>Test Time</div>
                    <div className='text-3xl tracking-widest font-["Chakra_Petch"] font-extrabold text-[var(--theme-font-color)]'>{typingContext.setting.duration}</div>
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

export default SoloResult