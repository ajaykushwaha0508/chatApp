import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsersForSidebar } from '../controllers/usersController.js';
const router = express.Router();

//get all users insted of us
router.get('/' , protectRoute , getUsersForSidebar);


export default router;