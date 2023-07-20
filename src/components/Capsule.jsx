import React from 'react'
import { useTyping } from '../context/TypingContext'

export const Capsule = () => {

    const typingContext = useTyping();

    return (
        <div className={`border-[rgba(255,255,255,0.2)] absolute top-[25%] transition-all duration-[0.5s] border py-2 px-4 rounded-3xl bg-[rgba(36,36,36)] shadow-md ${typingContext.isTyping ? 'opacity-0' : 'opacity-100'} font-['Josefin_Sans'] font-light`}>
            Hello World
        </div>
    )
}
