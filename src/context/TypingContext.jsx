import React, { useContext } from 'react';
import { sentence } from '../components/DefaultPara';

export const TypingValue = React.createContext();

export const useTyping = () => React.useContext(TypingValue);

export const TypingProvider = ({ children }) => {
    const [paragraph, setParagraph] = React.useState(null);
    const [isTyping, setIsTyping] = React.useState(true);
    const [setting, setSetting] = React.useState({
        mode: "Easy",
        duration: 30
    })
    const inputRef = React.useRef();

    React.useEffect(() => {
        setParagraph(sentence[setting.mode].split(''))
    }, [])

    const getNewPara = () => {
        // fetch the data
        setParagraph(sentence[setting.mode].split(''))
    }

    const [timeRemaining, setTimeRemaining] = React.useState(setting.duration);
    const [isRunning, setIsRunning] = React.useState(false);
    const [complete, setComplete] = React.useState(false);

    React.useEffect(() => {
        let interval;

        // Start the countdown when the button is clicked
        if (isRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
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
            setIsRunning(true);
        }
    };

    return (
        <TypingValue.Provider value={{
            isTyping, setIsTyping, inputRef, setting, setSetting, paragraph, setParagraph, getNewPara, timeRemaining, handleStart, setTimeRemaining, setIsRunning, complete, setComplete
        }}>
            {children}
        </TypingValue.Provider>
    )

}
