// import React from 'react'

import { Capsule } from "../components/Capsule";
import Solo from "../components/Solo"
import { useTyping } from "../context/TypingContext"
import { Helmet } from "react-helmet"

const Home = () => {

    const typingContext = useTyping();
    console.log(typingContext)

    return (
        <>
            <Helmet>
                <Helmet>
                    {/* Title */}
                    <title>Qwerty</title>
                    {/* Meta Description */}
                    <meta name="description" content="Practice typing solo in Qwerty's solo mode. Choose from different time bounds - 30 seconds, 60 seconds, or 120 seconds. Improve your typing skills and achieve higher scores." />
                    {/* Other Meta Tags */}
                    <meta property="og:title" content="Qwerty" />
                    <meta property="og:description" content="Practice typing solo in Qwerty's solo mode. Choose from different time bounds - 30 seconds, 60 seconds, or 120 seconds. Improve your typing skills and achieve higher scores." />
                    <meta property="og:url" content="https://www.getqwerty.tech" />
                    <meta property="og:image" content="https://i.postimg.cc/WtcFQgNY/Screenshot-2023-07-25-003428.png" />
                    <meta property="og:type" content="website" />
                    <meta property="og:site_name" content="Qwerty Speed Typing Game" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Qwerty" />
                    <meta name="twitter:description" content="Practice typing solo in Qwerty's solo mode. Choose from different time bounds - 30 seconds, 60 seconds, or 120 seconds. Improve your typing skills and achieve higher scores." />
                    <meta name="twitter:image" content="https://i.postimg.cc/WtcFQgNY/Screenshot-2023-07-25-003428.png" />
                </Helmet>
            </Helmet>
            <div className="w-[100%] relative min-h-[90vh] gap-8 flex flex-col justify-center items-center"
                onMouseMoveCapture={() => {
                    typingContext.setIsTyping(false);
                    document.body.style.cursor = 'default'
                }}
            >
                <Capsule />
                {!typingContext.loadingSentence && <Solo />}
            </div>
        </>
    )
}

export default Home