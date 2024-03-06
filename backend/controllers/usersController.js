import userModel from "../models/userModel.js";

export const getUsersForSidebar = async(req , res)=>{
    try{

        const loggedInUserId = req.user._id;
        
        const filterdUsers = await userModel.find({_id : {$ne : loggedInUserId}})
        .select("-password");
        
        res.status(200).json(filterdUsers);
    }catch(err){
        console.log("Error in getAllUsersForSidebar Controller" , err.message);
        res.status(500).json({error : "Internal server error"});
    }
}