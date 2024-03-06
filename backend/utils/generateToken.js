import jwt from 'jsonwebtoken';

const geneateTokenAndSetCookie = (userId , res)=>{

        // generate token 
        const token = jwt.sign({userId} , process.env.JWT_SECRET ,{
            expiresIn : '15d',
        })

        //set cookie
        res.cookie("jwt" , token , {
            maxAge : 15*24*60*60*1000,
            httpOnly : true,
            sameSite :'strict',
            secure : process.env.NODE_ENV !=="development" 
        });
}

export default geneateTokenAndSetCookie;