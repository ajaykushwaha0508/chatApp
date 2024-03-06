import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import geneateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async(req , res)=>{

    try{

   const {username , password} = req.body;

   const user = await userModel.findOne({username});
   if(!user){
       return res.status(400).json({error : "User not found!"});
   }
   const isPasswordCorrect = await bcrypt.compare(password , user.password);

   if(!user || !isPasswordCorrect){
        return res.status(400).json({error : "invalid username or password!"})
   }

   geneateTokenAndSetCookie(user._id , res);

   res.status(200).json({
    _id :user._id,
    fullname :user.fullname,
    username :user.username,
    profilePic :user.profilePic
   }) 
   }catch(err){    
    console.log("Error in login controller " , err.message);
    res.status(400).json({error : "Internal server error"});   
   }
} 

export const signup = async(req , res)=>{
  
    try{
        const {fullname , username , password , confirmPassword , gender} = req.body;
        

        if(password !== confirmPassword){
            return res.status(400).json({error : "Passwords don't match.."})
        }

        const user = await userModel.findOne({username});

        if(user){
            return res.status(400).json({error : "User already exist.."})
        }




        //random profile pic for the users 
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
         

        // hashpasswod code here
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password , salt); 

        const newUser = new userModel({
            fullname , 
            username , 
            password :hashpassword, 
             gender,
             profilePic : gender == 'male' ? boyProfilePic : girlProfilePic
        });
         
        if(newUser){
             geneateTokenAndSetCookie(newUser._id , res);
             
            await newUser.save();
        
        res.status(201).json({ 
                _id : newUser._id,
                fullname : newUser.fullname,
                username : newUser.username,
                profilePic : newUser.profilePic
            })
        }else{
            res.status(500).json({error : "invalied user data"});
        }
        
    }catch(err){
        console.log("Error in  signup contoller" , err.message);
        res.status(500).json({error : "Internal server error.."});
    }

} 

export const logout = (req , res)=>{    
    try{
        res.cookie("jwt" ,"",{maxAge : 0});
        res.status(200).json({message : "Logout Successfully"});
    }catch(err){
        console.log("Error in  login contoller" , err.message);
        res.status(500).json({error : "Internal server error.."})
    }
};