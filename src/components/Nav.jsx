// import React from 'react'
import { RiKeyboardLine } from 'react-icons/ri';

const Nav = () => {
    return (
        <div className="w-[100%] flex justify-between p-6 fixed z-10">
            <div className="text-4xl font-['Quantico'] font-bold tracking-widest flex gap-4 items-center">
                <RiKeyboardLine className='!text-[var(--theme-font-color)]' />
                <span className='!text-[var(--theme-font-color)]'>QWERTY</span>
            </div>
        </div>
    )
}

export default Nav