import React , {useRef , useEffect}from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeleton/MessageSkeleton'
import useListenMessage from '../../hooks/useListenMessage';



function Messages() {
  const {loading , messages} = useGetMessages();
  useListenMessage();
  
  // this is for scroll to bottom : for this we  create a div and take their reference using useRef

  const lastMessageRef = useRef();

  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior : "smooth"});
    } , 100)
  } , [messages]);
  // this is for scroll to bottom

  return (
   <div className='px-4 flex-1 overflow-auto pb-3'>
       
      {!loading && messages.length>0 &&  messages.map((message)=> 
      <div key={message._id} ref={lastMessageRef}>
      <Message  message={message}/> 
      </div>
      )}

      {!loading && messages.length===0 && (
        <p className='text-center'>Send a message to start the conversation</p>
        )}
      {loading && [...Array(3)].map((_ , idx)=> <MessageSkeleton key={idx}/>)}
       
   </div>
  )
}

export default Messages