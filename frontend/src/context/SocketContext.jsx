import { createContext, useContext, useEffect, useState } from "react";

import io from 'socket.io-client';
import {useAuthContext} from './AuthContext';

 const SocketContext = createContext();

export  const useSocketContext=()=>{
    return useContext(SocketContext);
 }

export const SocketContextProvider = ({children})=>{
    const [socket ,setSoket] = useState(null);
    const [onlineUsers , setOnlineUser] = useState();
    const {authUser} = useAuthContext();

    useEffect(()=>{
        if(authUser){

            const socket = io('http://localhost:8000' , {
                query : {
                    userId : authUser._id
                }
            });

            setSoket(socket);

    //socket.on() is used to listen to the events . can be used both client and server side  
            socket.on("getOnlineUsers" , (users)=>{
                setOnlineUser(users);
            })
            return ()=> socket.close();
        }else{
            if(socket){
                socket.close();
                setSoket(null);
            }
        }
    } , [authUser])

    return <SocketContext.Provider value={{socket , onlineUsers}}>
       {children}
    </SocketContext.Provider>
}