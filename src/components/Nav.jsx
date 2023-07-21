import React from 'react'
import { RiKeyboardLine } from 'react-icons/ri';
import { useMultiplayer } from '../context/MultiplayerContext';
import { Link } from 'react-router-dom';

const Nav = () => {

    const playerContext = useMultiplayer();

    const [currentPathname, setCurrentPathname] = React.useState(window.location.pathname);

    React.useEffect(() => {
        // Function to handle pathname changes
        const handlePathnameChange = () => {
            setCurrentPathname(window.location.pathname);
        };

        // Add event listener for 'popstate' event (triggered when the URL changes)
        window.addEventListener('popstate', handlePathnameChange);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('popstate', handlePathnameChange);
        };
    }, []);

    return (
        <div className="w-[100%] flex justify-between p-6 fixed z-10">
            <a href="/">
                <div className="text-4xl font-['Quantico'] font-bold tracking-widest flex gap-4 items-center">
                    <RiKeyboardLine className='!text-[var(--theme-font-color)]' />
                    <span className='!text-[var(--theme-font-color)]'>QWERTY</span>
                </div>
            </a>

            <div className='flex items-center gap-16'>
                {currentPathname == '/' ?
                    <a href={'/multiplayer'}>
                        <div className='text-md text-[var(--theme-font-color)] font-bold tracking-widest hover:text-white transition-all duration-[0.3s]'>
                            Multiplayer
                        </div>
                    </a>
                    :
                    <a href={'/'}>
                        <div className='text-md text-[var(--theme-font-color)] font-bold tracking-widest hover:text-white transition-all duration-[0.3s]'>
                            Solo
                        </div>
                    </a>
                }
                {(playerContext.user.user_name != null && playerContext.user.uid != null) &&
                    <div className='flex items-center gap-4'>
                        <div className='text-md text-[var(--theme-font-color)] font-bold tracking-widest'>{playerContext.user.user_name}</div>
                        <img
                            src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${playerContext.user.uid}&backgroundColor=b6e3f4&flip=true`} alt="" className='w-[3vw] rounded-[50%] cursor-pointer shadow'
                        />
                    </div>
                }
            </div>

        </div>
    )
}

export default Nav