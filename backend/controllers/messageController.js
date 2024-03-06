import conversationModel from "../models/conversationModel.js";
import messageModel from "../models/messageModel.js";
import { getReceiverSoketId, io } from "../socket/socket.js";


export const  sendMessage = async(req , res)=>{
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params; // rename id to reciverId  using :
        const senderId = req.user._id; // we can now use this because be add the user in the req by using middleware(protectRoute)

        let conversation = await conversationModel.findOne({
            participants :{$all : [senderId , receiverId]}
        });

        if(!conversation){
            conversation = await conversationModel.create({
                participants : [senderId , receiverId]
            })
        }

        const newMessage = new messageModel({
            senderId,
            receiverId ,
            message
        });

        if(newMessage){
            await conversation.messages.push(newMessage._id);
        }

        //await newMessage.save();
        //await  conversation.save();  // there is a problem  it will  wait for previous work complete  
        //!    or write in promise way
        await Promise.all([newMessage.save() , conversation.save()]); //using this this will run in parallel
         

        // socket.io functionality is here 
        const receiverSocketId = getReceiverSoketId(receiverId);
       
    
        if(receiverSocketId){
           
            // io.to(<soket_id>).emit() is use to send event to a specific client  
            io.to(receiverSocketId).emit("newMessage" , newMessage);
        }

        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json({error : "Internal server error"});
        console.log("Error in  sendMessage Controller" ,error.message);
    }
}

export const getMessage = async(req , res)=>{
    try{
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await conversationModel.findOne({
            participants : {$all : [senderId , userToChatId]}
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        res.status(200).json(messages);

    }catch(err){
            console.log("Error in getMessage Controller" , err.message);
            res.status(500).json({error : "Internal server error"});
    }
}