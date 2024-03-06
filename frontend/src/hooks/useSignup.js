import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = ()=>{
      const [loading , setLoading] = useState(false);
      const {authUser , setAuthUser} = useAuthContext();

    const signup = async({fullname , username , password , confirmPassword , gender})=>{

        const success =  handleInputErrors({fullname , username , password , confirmPassword , gender});
        if(!success) return;
        

        setLoading(true);

        try{
           const res = await fetch('/api/auth/signup' , {
            method : 'POST' , 
            headers : {"content-type" : "application/json"},
            body : JSON.stringify({fullname , username , password , confirmPassword , gender})
           });
           
           const data = await res.json();
           
           if(data.error){
            throw new error(data.error);
           }

           //set user in local storge 
           localStorage.setItem("chat-user" , JSON.stringify(data));
           //context
           setAuthUser(data);

        }catch(error){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {loading , signup};

}


function handleInputErrors({fullname , username , password , confirmPassword , gender}){
          
         if(!fullname || !username || !password || !confirmPassword || !gender){
            toast.error("Please fill in all fields");
            return false;
         }

         if(password !== confirmPassword){
            toast.error('Passwords do not match');
            return false;
         }

         if(password.length < 6){
            toast.error('Password must be atleast 6 characters');
            return false;
         }

         return true;
}

export default useSignup;