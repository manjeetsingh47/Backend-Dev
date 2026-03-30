import express from 'express';
import { getAllUsers } from '../controllers/userController.js';


const router = express.Router();

router.get("/user", getAllUsers)

export default router;