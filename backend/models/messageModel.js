import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
   senderId : {
     type : mongoose.Schema.Types.ObjectId , 
     ref : "User" , // this is collection name 
     required : true
   },
   receiverId : {
    type : mongoose.Schema.Types.ObjectId , 
    ref : "User" , // this is collection name 
    required : true
   },
   message : {
    type :String,
    required : true
   }
   //createdAt
   // updatedAt
} , 

{timestamps : true}  // this  is second parameter of schema function it is add two field in obj that  is “created At” and “updated At” that is contain time stemps.   
);

const messageModel = new mongoose.model("Message" , messageSchema);

export default messageModel;