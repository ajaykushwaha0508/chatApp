import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';

function Conversation({conversation , emoji , lastIdx}) {
    const {selectedConversation , setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;
    const {onlineUsers } = useSocketContext();
    // const isOnline = onlineUsers.includes(conversation._id);// we use the below property because includes is not suppported by many browsers
    const isOnline = onlineUsers?.indexOf(conversation._id) > -1;

    const scrollRight=()=>{
        const cls = document.getElementById("forscrollbar");
        console.log(cls.scrollTo({
            top : 0,
            left : 400,
            behavior : "smooth"
        }));
    }
    
  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
    ${ isSelected && 'bg-sky-500'}`} 
    onClick={()=>{setSelectedConversation(conversation) ; scrollRight()} }
    
    >
    
    <div className={`avatar ${isOnline ? "online" : ''}`}>
        <div className="w-12 rounded-full">
            <img src={conversation.profilePic}/>
        </div>
   </div>

   <div className='flex flex-col flex-1 '>
    <div className='flex gap-3 justify-between'>
        <p className='font-bold text-gray-200'>{conversation.fullname}</p>
        <span className='text-xl'>{emoji}</span>
    </div>
   </div>
  </div>

    {!lastIdx && <div className='divider my-0 py-0 h-1'/>}
    </>)
}

export default Conversation