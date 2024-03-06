import mongoose from "mongoose";

const connectToMongoDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to mongodb");
    }catch(err){
            console.log("Error in  Connecting to mongodb" , err.message);
    }
    
}
export default connectToMongoDB;
