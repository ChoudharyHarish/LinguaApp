import mongoose from "mongoose";

const userScoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const leaderBoardSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  scores: [userScoreSchema], // Array of user scores
});


const LeaderBoard = mongoose.model('LeaderBoard', leaderBoardSchema);
export default LeaderBoard;