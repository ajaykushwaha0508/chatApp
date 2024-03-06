import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversation from '../zustand/useConversation.js'
import notificatioSound from '../assets/sound/notification.mp3';
const useListenMessage = () => {
     const {socket}  = useSocketContext();
     const {messages , setMessages}  = useConversation();

     useEffect(()=>{
        socket?.on("newMessage" , (newMessage)=>{
            newMessage.shouldShake = true;
            const sound = new Audio(notificatioSound);
            sound.play();
            setMessages([...messages , newMessage]);
        });

        return ()=> socket.off("newMessage");
     },[socket , messages , setMessages]);
}

export default useListenMessage