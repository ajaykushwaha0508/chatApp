import express from 'express';
import { sendMessage , getMessage } from '../controllers/messageController.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

//get message route
router.get('/:id' ,protectRoute ,getMessage); //here the id is second person id with we chat  

//send message route
router.post('/send/:id' ,protectRoute ,sendMessage); //here the id is reciverId 

export default router;