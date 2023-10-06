import { useState,useCallback, useEffect,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed]= useState(false); //to allow number or not
  const [charAllowed,setCharAllowed]= useState(false);
  const [password,setPassword] = useState(""); // varibale to change password

  //use ref hook (to useRef hook we need to create a varibale)
  const passwordRef=useRef(null); // null is default value (initially no reference)


  //creating password generator
  const passwordGenerator= useCallback(()=>{
    let pass=""; //to generate password
    let str=
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // to contain data jinka usekarke password banaenge
    if(numberAllowed) str+="0123456789";
    if(charAllowed)   str+="!@#$%^&*()[]{}*";
    //for loop to generate password from str
    for(let i=1;i<=length;i++){
      let char= Math.floor(Math.random()*str.length + 1); // to generate random index of str
      pass +=str.charAt(char);
    }
    // use setpassword 
    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword])
  
  //using useEffect Hook to call PasswordGenerator method whenever either page reload or dependencies changes
  useEffect(()=>{
    passwordGenerator(); //running passwordGenerator
  },[length,numberAllowed,charAllowed,passwordGenerator])

  //creating copy to clipBoardmethod
  const copyPassToClipboard=useCallback(()=>{
    passwordRef.current?.select(); // just to give effect of copied by slection
    /* can be used to fix selection range
    passwordRef.current?.setSelectionRange(0,3); */
    window.navigator.clipboard.writeText(password);
    alert("Copied");
  },[password])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700">
        <h1 className='text-white text-center mb-4'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden  mb-4">
          <input type="text" value={password} className='outline-none w-full py-1 px-3 placeholder:"password"' readOnly ref={passwordRef}/>
          <button onClick={copyPassToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            {/* creating slider */}
            <input type="range" min={6} max={100} value={length} className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length:{length}</label>
          </div>
          {/* creating checkbox for number and char */}
          <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" className='cursor-pointer'
            onChange={()=>{setNumberAllowed((prev) => !prev)}}/>
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} id="charInput" className='cursor-pointer'
            onChange={()=>{setCharAllowed((prev) => !prev)}}/>
          <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
