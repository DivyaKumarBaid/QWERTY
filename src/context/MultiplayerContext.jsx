import React from 'react';
import { io } from 'socket.io-client';

const socket = io.connect(import.meta.env.VITE_API_URL);

export const MultiplayerValue = React.createContext();

export const useMultiplayer = () => React.useContext(MultiplayerValue);

export const MultiplayerProvider = ({ children }) => {

    // socket connection
    React.useEffect(() => {
        // Replace 'http://your-server-address' with the address of your server handling socket connections.

        // Event listener for 'connect' event.
        socket.on('connect', () => {
            console.log('Socket connected');
            // You can perform actions when the socket connection is established.
        });

        // Event listener for 'message' event.
        socket.on('message', (data) => {
            console.log('Received message:', data);
            // Handle incoming messages from the server.
        });

        // Event listener for 'disconnect' event.
        socket.on('disconnect', () => {
            console.log('Socket disconnected');
            // You can perform actions when the socket connection is closed.
        });

        // my events
        socket.on('connect_error', (err) => console.log(err))

        // room asigned
        socket.on('assigned-room', (data) => {
            setRoom(data.room);
            setPlayers(data.player);
        })
        // player count
        socket.on('player-count', (data) => {
            setPlayers(data.player);
        })
        // get started
        socket.on('get-started', (data) => {
            sendData(true); //delete this
            const { text } = data;
            setParagraph(text.split(''));
            setStateOfGame(2);
            handleStart();
            inputRef.current.focus();
        })
        //current score
        socket.on('current-score', (data) => {
            setPlayerScore(old => {
                if (data.score == 100) {
                    setRanked(old => [...old, {
                        score: data.score,
                        username: data.username,
                        uid: data.id
                    }])
                }
                return ({
                    ...old, [data.id]: {
                        score: data.score,
                        username: data.username,
                        uid: data.id
                    }
                })
            })
        })

        // Clean up the socket connection when the component unmounts.
        return () => {
            socket.disconnect();
        };
    }, []);

    // socket events
    // when player joins the lobby
    const joinLobby = () => {
        socket.emit('get-info', {
            username: user.user_name,
            id: user.uid,
            mode: setting.mode,
        })
        setStateOfGame(1);
    }
    // when player leaves the lobby
    const leaveLobby = () => {
        socket.emit('cancel-game', {
            username: user.user_name,
            id: user.uid,
            mode: setting.mode,
            room: room
        })
        console.log("leave")
        resetStates();
    }
    // send data every second
    const sendData = (first) => {
        let unChangedErrors = 0;
        testCorrect.forEach(item => {
            if (!item)
                unChangedErrors += 1;
        })
        const score = (index - unChangedErrors + 1) / testCorrect.length;
        socket.emit('get-current-score', {
            username: user.user_name,
            id: user.uid,
            score: first ? 0 : Math.max(0, (score * 100)),
            room: room
        })
    }
    // socket connection

    // socket connection

    const [room, setRoom] = React.useState(null);
    const [paragraph, setParagraph] = React.useState(null);

    const [user, setUser] = React.useState({
        uid: localStorage.getItem('uid') ? JSON.parse(localStorage.getItem('uid')) : null,
        user_name: localStorage.getItem('user_name') ? JSON.parse(localStorage.getItem('user_name')) : null,
    })

    const [setting, setSetting] = React.useState({
        mode: 0,
        duration: 15
    })

    const GameState = ["Idle", "Waiting", "Playing", "Finished"];

    const [stateOfGame, setStateOfGame] = React.useState(0);

    const loginUser = (name, uid) => {
        localStorage.setItem('user_name', JSON.stringify(name));
        localStorage.setItem('uid', JSON.stringify(uid));
        setUser({
            uid: localStorage.getItem('uid') ? JSON.parse(localStorage.getItem('uid')) : null,
            user_name: localStorage.getItem('user_name') ? JSON.parse(localStorage.getItem('user_name')) : null,
        })
    }

    // playground
    const [playerScore, setPlayerScore] = React.useState({});
    const [index, setIndex] = React.useState(-1);
    const [testCorrect, setTestCorrect] = React.useState([]);
    const [players, setPlayers] = React.useState(null);
    const [isTyping, setIsTyping] = React.useState(true);
    const [loadingSentence, setLoadingSentence] = React.useState(true);
    const inputRef = React.useRef();
    const [ranked, setRanked] = React.useState([]);

    const [timeRemaining, setTimeRemaining] = React.useState(setting.duration);
    const [isRunning, setIsRunning] = React.useState(false);
    const [complete, setComplete] = React.useState(false);

    const computeRanks = () => {
        let keys = [];
        for (const key in playerScore) {
            const flag = ranked.find(item => item.uid === key);
            if (flag == undefined || flag == null) {
                keys.push(playerScore[key])
            }
        }
        keys.sort((a, b) => (a.score > b.score) ? -1 : 1);
        keys = [...ranked, ...keys];
        let temp = keys[0];
        keys[0] = keys[1];
        keys[1] = temp;
        setRanked(keys);
    }

    // console.log(playerScore);

    React.useEffect(() => {
        let interval;

        // Start the countdown when the button is clicked
        if (isRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
                sendData();
            }, 1000);
        }

        // Clear the interval when the timer reaches 0
        if (timeRemaining === 0) {
            computeRanks();
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
    // playground


    // clear
    const resetStates = () => {
        setRoom(null);
        setParagraph(null);
        setStateOfGame(0);
        setIsTyping(false);
        setTimeRemaining(setting.duration);
        setIsRunning(false);
        setComplete(false);
        setPlayers(null);
        setPlayerScore(null);
    }
    // clear

    //

    return (
        <MultiplayerValue.Provider value={{ user, setUser, loginUser, setting, setSetting, stateOfGame, setStateOfGame, room, setRoom, paragraph, setParagraph, isTyping, setIsTyping, inputRef, timeRemaining, handleStart, setTimeRemaining, setIsRunning, complete, setComplete, loadingSentence, resetStates, players, setPlayers, index, setIndex, testCorrect, setTestCorrect, joinLobby, leaveLobby, sendData, playerScore, ranked }}>
            {children}
        </MultiplayerValue.Provider>
    )

}
