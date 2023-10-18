import Question from "../models/Question.js";
import User from "../models/user.js";
import History from "../models/history.js";
import LeaderBoard from "../models/leaderboard.js";


import { assignBadge } from "../utils/utils.js";

const getQuestionsByFilter = async (req, res) => {

  const { lang } = req.query;
  // console.log(req.query);

  // Add logic to fetch questions by user level;
  // for now we will just give user random 30 questions
  try {
    const questions = await Question.aggregate([
      { $match: { language: lang } },   
      { $sample: { size: 5 } }       // update this to 30
    ]);

    return res.status(202).json(questions);
  }
  catch (error) {
    console.log(error.message);
    return res.status(505).json({ msg: 'internal server error' });
  }
}


const submitAnswers = async (req, res) => {

  // workflow is simple first we will calculate score for user of this test and that will be the main response from server side 
  // after that we will store the data of this test in history collection and we will also update the leaderboard of language user has given the score
  // when user updates his langauge then also his score of previous langauage will appear on the leaderboardx


  const { userId } = req.user;
  try {
    const map = {
      0: 1,
      1: 3,
      2: 5
    }

    const responses = req.body;
    const questionIds = responses.map((question) => question.id);
    const questions = await Question.find({ _id: { $in: questionIds } });
    const user = await User.findById(userId);

    let score = 0;
    let total_correct = 0;
    let total_in_correct = 0;

    for (let i = 0; i < responses.length; i++) {
      const selectedAnswer = responses[i].selected;
      const question = questions.find((q) => q._id.equals(responses[i].id));
      if (question) {
        // score += question.correctAnswer === selectedAnswer ? map[question.level] : 0;
        if (question.correctAnswer === selectedAnswer) {
          score += map[question.level];
          total_correct++;
        }
        else total_in_correct++;
      }
    }

    // Add this test to user's history

    await History.create({
      userId: userId,
      questions: questionIds,
      score: score,
      noOfCorrect: total_correct,
      noOfInCorrect: total_in_correct,
    });

    // Add this user's score to leaderboard

    const leaderboard = await 
    LeaderBoard.findOne({ language: user.language });

    let  userScoreLang;
    if(leaderboard) userScoreLang = leaderboard.scores.find((score) => score.userId.toString() === userId);
    
    const badge = assignBadge(userScoreLang?.score + score);

    const updateObject = {
      $inc: {
        testsCompleted: 1,
      },
      $set: {
        badge: badge,
      },
    };

    await User.findOneAndUpdate({ _id: userId }, updateObject, { new: true });

    if (leaderboard) {
      const userScore = leaderboard.scores.find((score) => score.userId.toString() === userId);
      if (userScore) {  // just update user's score if that user already in leaderboard else just insert new one 
        userScore.score = userScore.score + score;
      } else {
        leaderboard.scores.push({ userId: userId, score: score });
      }

      leaderboard.scores.sort((a, b) => b.score - a.score);
      await leaderboard.save();
      return res.status(202).json({ score,total_correct , total_in_correct, badge: user.badge, leaderboard });
    }
    else {
      const newLeaderBoard = await LeaderBoard.create({
        language: user.language,
        scores: [{ userId: userId, score: score}],
      })
      return res.status(202).json({ score, total_correct , total_in_correct,  badge: user.badge, newLeaderBoard });
    }
  }
  catch (error) {
    // Handle any unexpected errors here
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
}


// ROUTE ONLY FOR ADMINS
const addQuestion = async (req, res) => {

  // body of  question should be like  question,options,correctAnswer,level,language 
  // { question : "how ___ doing ? ", options : [you, me], correctAnswer : "you", language : "english" , level : 0}


  try {
    const newQuestion = await Question.create({...req.body, language : req.body.language.toLowerCase()});
    return res.status(201).json(newQuestion);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add a question.' });
  }
}


export { getQuestionsByFilter, submitAnswers, addQuestion };