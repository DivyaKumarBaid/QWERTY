// import React from 'react'

import { Capsule } from "../components/Capsule";
import Solo from "../components/Solo"
import { useTyping } from "../context/TypingContext"

const Home = () => {

    const typingContext = useTyping();

    return (
        <div className="w-[100%] relative min-h-[90vh] gap-8 flex flex-col justify-center items-center" onMouseMoveCapture={() => {
            typingContext.setIsTyping(false);
            document.body.style.cursor = 'default'
        }}>
            <Capsule />
            <Solo />
        </div>
    )
}

export default Home