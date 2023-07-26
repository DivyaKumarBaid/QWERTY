import React, { useContext } from 'react';
import { sentence } from '../components/DefaultPara';

export const TypingValue = React.createContext();

export const useTyping = () => React.useContext(TypingValue);

export const TypingProvider = ({ children }) => {
    const [paragraph, setParagraph] = React.useState(null);
    const [isTyping, setIsTyping] = React.useState(true);
    const [loadingSentence, setLoadingSentence] = React.useState(true);
    const [setting, setSetting] = React.useState({
        mode: "Easy",
        duration: 30
    })
    const inputRef = React.useRef();

    const newParagraph = () => {
        setLoadingSentence(true);
        fetch(`https://qwerty-backend.onrender.com/text?mode=${setting.mode == "Easy" ? 0 : setting.mode == "Medium" ? 1 : 2}`)
            .then(res => res.json())
            .then(data => setParagraph(data.response.split('')))
            .catch(err => console.log(err))
            .finally(() => setLoadingSentence(false));
    }

    React.useEffect(() => {
        newParagraph()
        // setParagraph(sentence[setting.mode].split(''))
    }, [])

    const getNewPara = () => {
        // fetch the data
        newParagraph()
        // setParagraph(sentence[setting.mode].split(''))
    }

    const [startTime, setStartTime] = React.useState(null);
    const [timeRemaining, setTimeRemaining] = React.useState(setting.duration);
    const [isRunning, setIsRunning] = React.useState(false);
    const [complete, setComplete] = React.useState(false);

    React.useEffect(() => {
        let interval;

        // Start the countdown when the button is clicked
        if (isRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                const now = Date.now();
                const timeElapsed = now - startTime;
                const timeRemaining = Math.max(0, setting.duration * 1000 - timeElapsed);
                setTimeRemaining(Math.floor(timeRemaining / 1000));
            }, 1000);
        }

        // Clear the interval when the timer reaches 0
        if (timeRemaining === 0) {
            clearInterval(interval);
            setComplete(true);
            // show wpm
        }

        // Cleanup the interval on component unmount
        return () => {
            clearInterval(interval);
        };
    }, [isRunning, timeRemaining]);

    const handleStart = () => {
        if (timeRemaining === setting.duration) {
            setStartTime(Date.now());
            setIsRunning(true);
        }
    };

    return (
        <TypingValue.Provider value={{
            isTyping, setIsTyping, inputRef, setting, setSetting, paragraph, setParagraph, getNewPara, timeRemaining, handleStart, setTimeRemaining, setIsRunning, complete, setComplete, loadingSentence
        }}>
            {children}
        </TypingValue.Provider>
    )

}
