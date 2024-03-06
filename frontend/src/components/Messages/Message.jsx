import React from 'react'
import {useAuthContext} from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime }  from '../../utils/extractTime.js';

function Message({message}) {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = authUser._id === message.senderId;
  const chatClassname = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
  const bubbleBgColor = fromMe && 'bg-blue-500'; 
  const formatedTime = extractTime(message.createdAt); // to convert into normal time 
  const shakeClass = message.shouldShake ? "shake" : '';
  return (
    <div className={`chat ${chatClassname}`}>
    <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
           <img src={profilePic} />
        </div>
    </div>   

    <div className={`chat-bubble break-words text-white ${bubbleBgColor} ${shakeClass} `}>{message.message}</div>
    <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formatedTime}</div>
    </div>
  )
}

export default Message;