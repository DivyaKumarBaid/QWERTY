import React from 'react'
import { useTyping } from '../context/TypingContext'

export const Capsule = () => {

    const typingContext = useTyping();

    return (
        <div className={`border-[rgba(255,255,255,0.2)] absolute top-[20%] transition-all duration-[0.5s] border py-2 px-4 rounded-3xl bg-[rgba(36,36,36)] shadow-md ${typingContext.isTyping ? 'opacity-0' : 'opacity-100'} font-['Josefin_Sans'] flex gap-4`}>
            <>
                <div className={`opacity-50 cursor-pointer text-md font-bold ${typingContext.setting.mode == "Easy" ? 'text-[var(--theme-font-color)] !opacity-100' : 'text-white'} hover:opacity-100 transition-all duration-[0.3s]`} onClick={() => {
                    typingContext.setSetting(old => ({ ...old, mode: 'Easy' }))
                }} >Easy</div>
                <div className={`opacity-50 cursor-pointer text-md font-bold ${typingContext.setting.mode == "Medium" ? 'text-[var(--theme-font-color)] !opacity-100' : 'text-white'} hover:opacity-100 transition-all duration-[0.3s]`} onClick={() => {
                    typingContext.setSetting(old => ({ ...old, mode: 'Medium' }))
                }} >Medium</div>
                <div className={`opacity-50 cursor-pointer text-md font-bold ${typingContext.setting.mode == "Hard" ? 'text-[var(--theme-font-color)] !opacity-100' : 'text-white'} hover:opacity-100 transition-all duration-[0.3s]`} onClick={() => {
                    typingContext.setSetting(old => ({ ...old, mode: 'Hard' }))
                }} >Hard</div>
            </>

            <span className='opacity-50'>|</span>
            <>
                <div className={`opacity-50 cursor-pointer text-md font-bold ${typingContext.setting.duration == "30" ? 'text-[var(--theme-font-color)] !opacity-100' : 'text-white'} hover:opacity-100 transition-all duration-[0.3s]`} onClick={() => {
                    typingContext.setSetting(old => ({ ...old, duration: '30' }))
                }} >30s</div>
                <div className={`opacity-50 cursor-pointer text-md font-bold ${typingContext.setting.duration == "60" ? 'text-[var(--theme-font-color)] !opacity-100' : 'text-white'} hover:opacity-100 transition-all duration-[0.3s]`} onClick={() => {
                    typingContext.setSetting(old => ({ ...old, duration: '60' }))
                }} >60s</div>
                <div className={`opacity-50 cursor-pointer text-md font-bold ${typingContext.setting.duration == "120" ? 'text-[var(--theme-font-color)] !opacity-100' : 'text-white'} hover:opacity-100 transition-all duration-[0.3s]`} onClick={() => {
                    typingContext.setSetting(old => ({ ...old, duration: '120' }))
                }} >120s</div>
            </>
            <span className='opacity-50'>|</span>
            <div
                className='text-[var(--theme-font-color)] cursor-pointer text-md font-bold'
                onClick={() => typingContext.getNewPara()}
            >

                Update
            </div>
        </div>
    )
}
