import React from 'react'
import { v4 as uuid } from 'uuid';
import { uniqueNamesGenerator, names } from 'unique-names-generator';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { useMultiplayer } from '../context/MultiplayerContext';

const config = {
    dictionaries: [names]
}

const NameModal = () => {

    const playerContext = useMultiplayer();

    // for profile image
    const [uid, setUid] = React.useState("");
    const [name, setName] = React.useState(uniqueNamesGenerator(config));

    const generateUid = () => {
        const unique_id = uuid();
        const small_id = unique_id.slice(0, 8);
        setUid(small_id);
    }

    const generateRandomName = () => {
        setName(uniqueNamesGenerator(config));
    }

    React.useEffect(() => {
        generateUid();
    }, [])


    return (
        <div className="w-[100vw] absolute left-0 top-0 z-[22] h-[100vh] bg-[rgba(36,36,36,0.3)] backdrop-blur-sm flex items-center justify-center">
            <div className='bg-[rgba(36,36,36)] shadow-lg rounded-lg p-4 flex flex-col items-center gap-4'>
                <img
                    src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${uid}&backgroundColor=b6e3f4&flip=true`} alt="" className='w-[12vw] rounded-[50%] cursor-pointer'
                    onClick={() => generateUid()}
                />

                <div className='flex items-end gap-4 p-2 '>
                    <div className='flex flex-col items-start gap-2'>
                        <div>Name</div>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className='outline-none border border-[rgba(255,255,255,0.5)] bg-transparent py-1 px-2 rounded-lg'
                        />
                    </div>
                    <GiPerspectiveDiceSixFacesRandom
                        className='text-3xl cursor-pointer'
                        onClick={() => generateRandomName()}
                    />
                </div>
                <div
                    onClick={() => {
                        name.trim() == "" && generateRandomName()
                        playerContext.loginUser(name, uid)
                    }}
                    className='border-2 rounded-md py-1 px-2 cursor-pointer hover:bg-[var(--theme-font-color)] hover:border-[var(--theme-font-color)] transition-all duration-[0.2s]'
                >
                    Submit
                </div>
            </div>
        </div>
    )
}

export default NameModal