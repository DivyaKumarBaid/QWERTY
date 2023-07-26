import React from 'react'
import SoloResult from './SoloResult';
import { useMultiplayer } from '../context/MultiplayerContext';
import RaceTrack from './RaceTrack';
import MultiplayerResult from './MultiplayerResult';
import { toast } from 'react-hot-toast';
import { blurToastStyle } from '../util/ToastStyle';

const MultiplayerPlayground = () => {

    const playerContext = useMultiplayer();
    const [input, setInput] = React.useState("");
    const [keyStrokes, setKeyStrokes] = React.useState(0);
    const [totalError, setTotalError] = React.useState(0);
    // const [typingContext.paragraph, setTest] = React.useState(typingContext.paragraph);

    React.useEffect(() => {
        if (playerContext.paragraph) {
            playerContext.setTestCorrect(playerContext.paragraph.map(i => true))
            playerContext.setIndex(-1);
            setInput("");
        }
    }, [playerContext.paragraph])

    // console.log(testCorrect);

    const handleInput = (e) => {
        setKeyStrokes(old => old + 1);
        playerContext.setIsTyping(true);
        setInput(e.target.value);
        let len = e.target.value.length - 1;
        const lastChar = (e.target.value[len] === playerContext.paragraph[len]); //true or false;
        const arr = playerContext.testCorrect;
        !lastChar && setTotalError(old => old + 1);
        arr[len] = lastChar;
        playerContext.setIndex(len);
        // len % 130 == 129 && document.getElementById('scrollDiv').scrollBy(0, 60);
        if (len == 125) {
            document.getElementById('scrollDiv').scrollBy({
                top: 36,
                left: 0,
                behavior: "smooth",
            });
        }
        else {
            if (len > 125) {
                len -= 120;
                len % 60 == 0 && document.getElementById('scrollDiv').scrollBy({
                    top: 36,
                    left: 0,
                    behavior: "smooth",
                });
            }
        }
        playerContext.setTestCorrect(arr);
    }


    return (
        !playerContext.complete ? <div className='flex flex-col items-center'>
            <div>
                <input
                    type="text"
                    id="inputBox"
                    className='opacity-0 z-[-10] absolute'
                    autoFocus={true}
                    onChange={handleInput}
                    value={input}
                    ref={playerContext.inputRef}
                    onPaste={e => e.preventDefault()}
                    onCut={e => e.preventDefault()}
                    onCopy={e => e.preventDefault()}
                    // onBlur={() => playerContext.stateOfGame == '2' && toast('To start typing again click on the text', blurToastStyle)}
                    onKeyDown={e => e.key === "Backspace" && setKeyStrokes(old => old - 1)}
                />
            </div>
            {
                playerContext.stateOfGame == 1 &&
                <div className='flex flex-col items-center'>
                    <div className='text-[4rem] animate-pulse font-medium font-["Chakra_Petch"] tracking-widest'>Waiting...</div>
                    {playerContext.players && <div className='text-2xl text-[var(--theme-font-color)] animate-pulse font-medium font-["Chakra_Petch"] tracking-widest'>Players : {playerContext.players}</div>}
                </div>
            }
            {playerContext.paragraph != null && <div className='w-[100%] mt-[8%] mb-[2%] flex justify-center items-center filterScreen flex-col'
                onClick={() => {
                    playerContext.inputRef.current.focus()
                    playerContext.setIsTyping(true);
                    document.body.style.cursor = 'none'
                }}
            >

                <div
                    className="typer scroll-smooth w-[80%] max-h-[38vh] overflow-auto" id="scrollDiv"
                >
                    <div className="absolute z-[22] translate-y-[-50px] text-2xl text-[var(--theme-font-color)] font-['Source_Code_Pro']">{playerContext.timeRemaining} seconds</div>
                    <div className="text-3xl font-['Source_Code_Pro'] my-20 text-center tracking-[-8px]">
                        {playerContext.paragraph.map((item, idx) => {
                            return (
                                <span key={item + idx}>
                                    <span className={`${idx > playerContext.index ? 'opacity-[0.25]' : playerContext.testCorrect[idx] ? 'opacity-100' : '!text-[red] opacity-100'} `}>{(item == " " && idx <= playerContext.index) ? !playerContext.testCorrect[idx] ? ' ' : ' ' : item}</span>
                                    {<span className={`text-white transition-all text-[var(--theme-font-color)] duration-[0.1s] ${(playerContext.isTyping && idx == playerContext.index) ? 'opacity-100 animate-pulse' : 'opacity-0'}`}>|</span>}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>}
            {
                playerContext.stateOfGame == 2 &&
                <RaceTrack />
            }
        </div>
            : <MultiplayerResult keyStrokes={keyStrokes} testCorrect={playerContext.testCorrect} totalError={totalError} />
    )
}

export default MultiplayerPlayground