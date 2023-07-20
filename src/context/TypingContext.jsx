import React, { useContext } from 'react';

export const TypingValue = React.createContext();

export const useTyping = () => React.useContext(TypingValue);

export const TypingProvider = ({ children }) => {
    const [isTyping, setIsTyping] = React.useState(true);
    const inputRef = React.useRef();

    return (
        <TypingValue.Provider value={{ isTyping, setIsTyping, inputRef }}>
            {children}
        </TypingValue.Provider>
    )

}
