import express from 'express';
const router = express.Router();

import { signUp,signIn, userDetails, updateDetails} from '../controllers/user.js';
import {getQuestionsByFilter, submitAnswers} from "../controllers/question.js";

import authentication from '../middleware/auth.js';
import { getLeaderBoardDetails } from '../controllers/leaderBoard.js';
import { getHistory, getTest } from '../controllers/history.js';


//Handle authentcaion
router.post("/signup",signUp);
router.post("/signin",signIn);


// to retrieve user information and updating it
router.get('/getDetails', authentication,userDetails);
router.post('/updateDetails',authentication,updateDetails);


// quiz related routes
router.get("/getQuestions", authentication,getQuestionsByFilter);
router.post("/submitAnswers",authentication,submitAnswers);
router.get("/leaderBoard",authentication,getLeaderBoardDetails);



// routes for history of user's test
router.get('/history', authentication,getHistory);
router.get('/history/:id',authentication,getTest);


export default router;