import { useCallback, useEffect, useState, useRef } from 'react'

import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(10);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const passRef = useRef(null)
  // Password generator function

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm'
    if (numberAllow) str += "123456789"
    if (charAllow) str += "!@#$%^&*(){}:;<>,.?/+"

    for (let i = 0; i <= length; i++) {
      let ran = Math.floor(Math.random() * str.length)
      pass += str[ran]
    }
    setPassword(pass)
  }, [length, numberAllow, charAllow])

  // Copy to clipBoard function

  const copyText = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllow, charAllow])
  return (
    <div className='flex justify-center items-center w-full h-screen '>
      <div className=' flex flex-col gap-4 backdrop-opacity-10 border-2  border-blue-500  w-1/2 p-7  rounded-lg'>
        <div className='relative '>
          <input type="text" ref={passRef} value={password} className='rounded-md p-3 selection:bg-blue-200 text-lg font-bold w-full outline-none border-none' readOnly />
          <button onClick={copyText} className='absolute right-0 h-full rounded-e-md w-1/6 text-white font-bold text-lg outline-none border-none active:opacity-90 bg-blue-700'>Copy</button>
        </div>
        <div className='text-white flex items-center justify-evenly'>
          <label className='flex gap-3' >
            <input type="range" onChange={(e) => { setLength(e.target.value) }} value={length} min={10} max={20} />
            Length : {length}
          </label>
          <label className='flex gap-3' >
            <input type="checkbox" onChange={() => {
              setNumberAllow(prev => !prev)
            }} value={numberAllow} />
            Numbers
          </label>
          <label className='flex gap-3' >
            <input type="checkbox" onChange={() => {
              setCharAllow(prev => !prev)
            }} value={charAllow} />
            Special-Characters
          </label>

        </div>
      </div>
    </div>
  )
}

export default App
