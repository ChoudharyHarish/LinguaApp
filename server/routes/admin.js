import express from 'express';
const router = express.Router();

import {addQuestion} from "../controllers/question.js";
import authentication from '../middleware/auth.js';

const isAdmin = (req,res,next) => {
    if(req.user && req.user.role === 'admin')   next();
    else return res.status(403).json({ message: 'Access denied. Admin role required.' });
}


router.post("/addQuestion", authentication,isAdmin, addQuestion);

export default router;