import React, { useState } from 'react'
import { BsSend } from "react-icons/bs";
import useSendMessage from '../../hooks/useSendMessage';
function MessageInput() {
  const [message , setMessage] = useState("");
  const { loading , sendMessage } = useSendMessage();

  const handleSubmit=async(event)=>{
    event.preventDefault();
      if(!message) return;
      await sendMessage(message);
      setMessage("");
  }

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input type='text' placeholder='Send a message' spellCheck="false" className='border text-sm rounded-lg w-full block p-2.5 bg-gray-700 border-gray-600 text-white '
            onChange={(e)=> setMessage(e.target.value)} value={message}
            />
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3 text-white hover:text-gray-300 '
            onClick={()=> handleSubmit()}
            >
            {loading ? <span className='loading loading-spinner'></span> : <BsSend/> }
            </button>
        </div>
    </form>
  )
}

export default MessageInput