import React from 'react'
import { useTyping } from '../context/TypingContext';
import SoloResult from './SoloResult';

const Solo = () => {

    const typingContext = useTyping();

    const [input, setInput] = React.useState("");
    const [index, setIndex] = React.useState(-1);
    const [keyStrokes, setKeyStrokes] = React.useState(0);
    // const [typingContext.paragraph, setTest] = React.useState(typingContext.paragraph);
    const [testCorrect, setTestCorrect] = React.useState([]);

    React.useEffect(() => {
        if (typingContext.paragraph) {
            setTestCorrect(typingContext.paragraph.map(i => true))
            setIndex(-1);
            setInput("");
        }
    }, [typingContext.paragraph])

    // console.log(testCorrect);

    const handleInput = (e) => {
        setKeyStrokes(old => old + 1);
        typingContext.setIsTyping(true);
        setInput(e.target.value);
        let len = e.target.value.length - 1;
        len == 0 && typingContext.handleStart()
        const lastChar = (e.target.value[len] === typingContext.paragraph[len]); //true or false;
        const arr = testCorrect;
        arr[len] = lastChar;
        setIndex(len);
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
        setTestCorrect(arr);
    }

    return (
        !typingContext.complete ? <>
            <div>
                <input
                    type="text"
                    id="inputBox"
                    className='opacity-0 z-[-10] absolute'
                    autoFocus={true}
                    onChange={handleInput}
                    value={input}
                    ref={typingContext.inputRef}
                    onPaste={e => e.preventDefault()}
                    onCut={e => e.preventDefault()}
                    onCopy={e => e.preventDefault()}
                    onKeyDown={e => e.key === "Backspace" && setKeyStrokes(old => old - 1)}
                />
            </div>
            {typingContext.paragraph != null && <div className='w-[100%] flex justify-center items-center filterScreen flex-col'
                onClick={() => {
                    typingContext.inputRef.current.focus()
                    typingContext.setIsTyping(true);
                    document.body.style.cursor = 'none'
                }}
            >

                <div
                    className="typer scroll-smooth w-[80%] max-h-[38vh] overflow-auto" id="scrollDiv"
                >
                    <div className="absolute z-[22] translate-y-[-50px] text-2xl text-[var(--theme-font-color)] font-['Source_Code_Pro']">{typingContext.timeRemaining} seconds</div>
                    <div className="text-3xl font-['Source_Code_Pro'] my-20 text-center tracking-[-8px]">
                        {typingContext.paragraph.map((item, idx) => {
                            return (
                                <span key={item + idx}>
                                    <span className={`${idx > index ? 'opacity-[0.25]' : testCorrect[idx] ? 'opacity-100' : '!text-[red] opacity-100'} `}>{(item == " " && idx <= index) ? !testCorrect[idx] ? ' ' : ' ' : item}</span>
                                    {<span className={`text-white transition-all text-[var(--theme-font-color)] duration-[0.1s] ${(typingContext.isTyping && idx == index) ? 'opacity-100 animate-pulse' : 'opacity-0'}`}>|</span>}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>}
        </>
            : <SoloResult keyStrokes={keyStrokes} testCorrect={testCorrect} />
    )
}

export default Solo