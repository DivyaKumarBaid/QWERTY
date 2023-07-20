import React from 'react'
import { useTyping } from '../context/TypingContext';

const sentence = "Lorem ipsum dolor sit amet consectetur adipisicing elit Harum labore perspiciatis amet et quam vel molestiae excepturi qui quasi quae quia reiciendis inventore fugit earum voluptas praesentium nesciunt Ducimus deseruntEos soluta quas dignissimos illo at rem sunt repellendus vel harum unde doloremque necessitatibus dolores voluptas deserunt neque temporibus pariatur Doloremque velit obcaecati accusantium fugit repellendus molestias totam quidem libero Accusamus cumque suscipit Incidunt excepturi necessitatibus totam alias doloribus doloremque odio saepe esse voluptatum delectus quae dolorum laudantium praesentium sed assumenda dolor sit mollitia veniam voluptates exercitationem porro Pariatur praesentium Tempora quis facilis expedita modi itaque reprehenderit repudiandae consequuntur eius quisquam molestias iure cupiditate doloribus fugit dolor minus Vitae repellendus suscipit aspernatur Earum quas necessitatibus deserunt quo nulla beatae mollitia Libero dicta amet reprehenderit magni animi cumque quaerat praesentium doloribus nulla impedit optio architecto Commodi porro error dignissimos nemo veritatis officia dolorem aspernatur sequi eius vero Quo officia rerum natus";

const Solo = () => {

    const typingContext = useTyping();

    const [input, setInput] = React.useState("");
    const [index, setIndex] = React.useState(-1);
    const [test, setTest] = React.useState(sentence.split(''));
    const [testCorrect, setTestCorrect] = React.useState(sentence.split('').map(i => true));
    // console.log(test);

    const handleInput = (e) => {
        typingContext.setIsTyping(true);
        setInput(e.target.value);
        let len = e.target.value.length - 1;
        const lastChar = (e.target.value[len] === test[len]); //true or false;
        const arr = testCorrect;
        arr[len] = lastChar;
        setIndex(len);
        console.log(len, len % 120)
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
        <>
            <div>
                <input
                    type="text"
                    id="inputBox"
                    className='opacity-0 z-[-10] absolute'
                    autoFocus={true}
                    onChange={handleInput}
                    ref={typingContext.inputRef}
                />
            </div>
            <div className='w-[100%] flex justify-center items-center filterScreen'
                onClick={() => {
                    typingContext.inputRef.current.focus()
                    typingContext.setIsTyping(true);
                    document.body.style.cursor = 'none'
                }}
            >
                <div
                    className="typer scroll-smooth w-[80%] max-h-[38vh] overflow-auto" id="scrollDiv"
                >
                    <div className="text-3xl font-['Source_Code_Pro'] my-20 text-center tracking-[-8px]">
                        {test.map((item, idx) => {
                            return (
                                <span key={item + idx}>
                                    <span className={`${idx > index ? 'opacity-[0.25]' : testCorrect[idx] ? 'opacity-100' : '!text-[red] opacity-100'} `}>{item}</span>
                                    {<span className={`text-white transition-all text-[var(--theme-font-color)] duration-[0.1s] ${(typingContext.isTyping && idx == index) ? 'opacity-100 animate-pulse' : 'opacity-0'}`}>|</span>}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Solo