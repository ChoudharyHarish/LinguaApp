import LeaderBoard from "../models/leaderboard.js";
import User from "../models/user.js";
const getLeaderBoardDetails  = async(req,res) => {
    const {lang} = req.query;

    try {
          const leaderboard = await LeaderBoard.findOne({ language : lang }).select('-_id -__v');
         if(!leaderboard){
            return res.status(404).json({ msg: 'Leaderboard not found' });
         }
         else{
            const leaderBoardData = await Promise.all(
                leaderboard.scores.map(async (scoreData) => {
                  const user = await User.findById(scoreData.userId);
                  const username = user ? user.name : 'Unknown';
        
                  return {
                    score: scoreData.score,
                    userid: scoreData.userId,
                    username: username,
                  };
                })
              );
              return res.status(200).json({lang: leaderboard.language, scores : leaderBoardData});
          
         }
          
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Internal Server Error" })
        }
}


export {getLeaderBoardDetails};