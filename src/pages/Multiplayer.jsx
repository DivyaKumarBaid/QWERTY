import React from 'react'
import NameModal from '../components/NameModal'
import { useMultiplayer } from '../context/MultiplayerContext'
import ModeChoice from '../components/ModeChoice';
import MultiplayerPlayground from '../components/MultiplayerPlayground';
import { Helmet } from 'react-helmet';


const Multiplayer = () => {



    const playerContext = useMultiplayer();

    return (
        <>
            <Helmet>
                <Helmet>
                    {/* Title */}
                    <title>Qwerty</title>
                    {/* Meta Description */}
                    <meta name="description" content="Compete with friends in Qwerty's multiplayer mode. Test your typing speed and accuracy against other players. Join a lobby and start typing!" />
                    {/* Other Meta Tags */}
                    <meta property="og:title" content="Qwerty" />
                    <meta property="og:description" content="Compete with friends in Qwerty's multiplayer mode. Test your typing speed and accuracy against other players. Join a lobby and start typing!" />
                    <meta property="og:url" content="https://www.getqwerty.tech/multiplayer" />
                    <meta property="og:image" content="https://i.postimg.cc/WtcFQgNY/Screenshot-2023-07-25-003428.png" />
                    <meta property="og:type" content="website" />
                    <meta property="og:site_name" content="Qwerty Speed Typing Game" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Qwerty" />
                    <meta name="twitter:description" content="Compete with friends in Qwerty's multiplayer mode. Test your typing speed and accuracy against other players. Join a lobby and start typing!" />
                    <meta name="twitter:image" content="https://i.postimg.cc/WtcFQgNY/Screenshot-2023-07-25-003428.png" />
                </Helmet>
            </Helmet>

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
        </>
    )
}

export default Multiplayer