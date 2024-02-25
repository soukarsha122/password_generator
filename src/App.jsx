import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
 
  /************************************Initialisation********************************************/

  // initial length of password is 8
  const [length, setLength] = useState(8)   
  
  // initially the app doesnt allow numbers or special chars in generated password
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)

  // initially generated password is empty
  const [password, setPassword] = useState("")

  /**********************************************************************************************/

  /****************************** HOOKS *********************************/
  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "" // variable to store the password

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" // variable to store the viable chars in pass

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    // target "length" number of random indices in str and use the values present in those
    // indices to generate the password
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  // copying the password to clipbOARD
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // if the input field is not empty then select the password
    passwordRef.current?.setSelectionRange(0, 999); 
    window.navigator.clipboard.writeText(password)
  }, [password])

  // useEffect is invoked when the page refreshes and when any of the values in the dependency list is updated
  // In the dependency list keep those elements which the targetted element is communicating with
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  /***************************************************************************/
  return (
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password} // The input fieldmust have the value of generated password
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef} // pass the reference to passwordRef
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>

        {/* slider */}
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>

      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    
  )
}

export default App