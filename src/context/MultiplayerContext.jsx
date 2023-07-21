import React, { Children } from 'react';

export const MultiplayerValue = React.createContext();

export const useMultiplayer = () => React.useContext(MultiplayerValue);

export const MultiplayerProvider = ({ children }) => {

    const [user, setUser] = React.useState({
        uid: localStorage.getItem('uid') ? JSON.parse(localStorage.getItem('uid')) : null,
        user_name: localStorage.getItem('user_name') ? JSON.parse(localStorage.getItem('user_name')) : null,
    })

    const loginUser = (name, uid) => {
        console.log(name, uid)
        localStorage.setItem('user_name', JSON.stringify(name));
        localStorage.setItem('uid', JSON.stringify(uid));
        setUser({
            uid: localStorage.getItem('uid') ? JSON.parse(localStorage.getItem('uid')) : null,
            user_name: localStorage.getItem('user_name') ? JSON.parse(localStorage.getItem('user_name')) : null,
        })
    }

    return (
        <MultiplayerValue.Provider value={{ user, setUser, loginUser }}>
            {children}
        </MultiplayerValue.Provider>
    )

}
