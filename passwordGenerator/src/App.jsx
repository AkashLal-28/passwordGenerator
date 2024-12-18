import { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  const[password, setPassword] = useState("")
  const[length, setlength] = useState("")
  const[numberAllowed, setNumberAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)

  //useref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, setPassword])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-xl text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly 
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white 
        px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-l'>
            <input type="checkbox" 
            defaultChecked = {numberAllowed}
            id='numberInput'
            className='cursor-pointer'
            onChange={() => {
                setNumberAllowed((prev) => !prev)  //previous value access with this method
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-l'>
            <input type="checkbox" 
            defaultChecked = {charAllowed}
            id='characterInput'
            className='cursor-pointer'
            onChange={() => {
                setCharAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
