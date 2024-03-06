import express from 'express';
import path, { dirname } from 'path'; //D
import {app, server} from './socket/socket.js' // now we import the app from sokect file
import authRoutes from './routes.js/authRoutes.js';

import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
import messageRoutes from './routes.js/messageRoutes.js';
import usersRoutes from './routes.js/usersRoutes.js';

import cookieParser from 'cookie-parser';
dotenv.config(); 
const port = process.env.PORT || 5000

const __dirname = path.resolve(); //D

app.use(express.json()); // to get the data from the requset 
app.use(cookieParser()); // write this before routers  it is use to interact with cookies 

app.use('/api/auth' , authRoutes);
app.use('/api/message' , messageRoutes); 
app.use('/api/users' , usersRoutes); // for get all the users insted of us 

app.use(express.static(path.join(__dirname , "/frontend/dist"))); //D

app.get("*" , (req , res)=>{ //D
  res.sendFile(path.join(__dirname , "frontend" , "dist" ,"index.html")); //D
})

server.listen(port , ()=>{ // now we change the app to server
    console.log(`Server is running on port ${port}`);
    connectToMongoDB();
});