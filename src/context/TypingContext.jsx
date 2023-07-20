import React, { useContext } from 'react';
import { sentence } from '../components/DefaultPara';

export const TypingValue = React.createContext();

export const useTyping = () => React.useContext(TypingValue);

export const TypingProvider = ({ children }) => {
    const [paragraph, setParagraph] = React.useState(null);
    const [isTyping, setIsTyping] = React.useState(true);
    const [setting, setSetting] = React.useState({
        mode: "Easy",
        duration: "30"
    })
    const inputRef = React.useRef();

    React.useEffect(() => {
        setParagraph(sentence[setting.mode].split(''))
    }, [])

    const getNewPara = () => {
        // fetch the data
        setParagraph(sentence[setting.mode].split(''))
    }

    return (
        <TypingValue.Provider value={{
            isTyping, setIsTyping, inputRef, setting, setSetting, paragraph, setParagraph, getNewPara
        }}>
            {children}
        </TypingValue.Provider>
    )

}
