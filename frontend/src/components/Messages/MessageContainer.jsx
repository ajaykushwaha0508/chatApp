import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

function MessageContainer() {
  const {selectedConversation , setSelectedConversation} = useConversation();

  

  useEffect(()=>{ // to reset the state of selected conversation 
    // run on component unmount
    return ()=>{
      setSelectedConversation(null);
    }
  }, [setSelectedConversation])
  return (
    <div className='md:min-w-[450px] min-w-full  flex flex-col'>
      {
         !selectedConversation ? (<NoChatSelected/>) :
         (<> 
         <div className='bg-slate-500 px-2 py-2 mb-2 '>
         <span className='label-text'>To:</span><span className="text-gray-900 font-bold"> {selectedConversation.fullname}</span>
       </div>
 
         <Messages/>
        <MessageInput/>
        </>)
    }
    </div>
    
  )
}

export default MessageContainer

function NoChatSelected(){
  const {authUser} = useAuthContext();

    return<>
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome {authUser.fullname} 👋</p>
                <p>Select a chat to start messaging</p>
                 <TiMessages className='text-3xl md:text-6xl text-center'/>
            </div>
        </div>
    </>
}