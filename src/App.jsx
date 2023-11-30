import { useState, useCallback, useEffect, useRef } from 'react'


function App() {

    const [length,setlength] = useState(8)
    const [number,setnumber] = useState(false)
    const [char,setchar] = useState(false)
    const [password,setpassword] = useState("")

    // useRef Hook
    const passwordrefer = useRef(null)

    const passwordgenerator = useCallback(() => {

        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if (number) str+= "0123456789"
        if (char) str+= "!@#$%^&*_-+=:;,./|~{}[]?()"

        for (let i = 1; i <=length; i++) {
         
          const rand = Math.floor(Math.random() * str.length + 1)
          pass += str.charAt(rand)
        }
        setpassword(pass);



    },[length, number,char,setpassword])

    // copy button is dependent to password filed
    const coptoclipboard = useCallback(() => {
      passwordrefer.current?.select()
      // passwordrefer.current?.setSelection(0,0)
      window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(()=> {
      passwordgenerator();

    },[length,char,number,setpassword])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-amber-500 bg-gray-700">
        <h1 className="text-white text-center py-2 ">Password Generator</h1>
       <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" name="" id="" value={password} className='outline-none w-full py-2 px-3' 
        placeholder='Generate Now'
        readOnly
        ref={passwordrefer}
        />
        <button className='bg-blue-600 text-white px-2 py-0.5 outline-none'onClick={coptoclipboard} >Copy</button>
       </div>

        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-x-1'>
            <input type="range" name="" id="" min={6} max={16} value={length}  className='cursor-pointer' onChange={(e) => {setlength(e.target.value)}}/>
            <label>Length: {length}</label>
            <div className="flex items-center gap-x-1">
              <input type="checkbox" name="" id="" defaultValue={number} onChange={()=> {
                setnumber((prev) => !prev);
              }}/>
              <label>Number{number}</label>

            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox" name="" id="" defaultValue={char} onChange={()=> {
                setchar((prev) => !prev);
              }}/>
              <label>Char{char}</label>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
