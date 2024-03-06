import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const protectRoute = async(req , res , next)=>{
    try{
            const token = req.cookies.jwt; // to use this import cookie parser 

            if(!token){
                return res.status(401).json({error : "unauthorized - No token provided"});
            }
            
            const decoded = jwt.verify(token ,process.env.JWT_SECRET);// if this tokoen is created by this jwt secreate , this will return  userId that we  assign at the time of  token creation 
            
            if(!decoded){
                return res.status(401).json({error : "unauthorized - invalid token"});
            }
            
            const user = await userModel.findById(decoded.userId).select("-password"); // - means remove that from the obj 
            
            if(!user){
                return res.status(404).json({error : "User not found"});
            }

            req.user = user; // we add the user in the request  so we can get that user in the next fuction parameter 
            
            next(); // go to the next function 
    
    }catch(err){
        console.log('Error in protectRoute Middleware');
        res.status(500).josn({error : "Internal server error"})
    }
}

export default protectRoute;