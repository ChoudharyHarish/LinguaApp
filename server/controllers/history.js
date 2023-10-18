import History from "../models/history.js";

const getHistory = async(req,res) => {
    const {userId} = req.user;

    try{
        const history = await History.find({userId});
        console.log(history);
        return res.status(202).json(history);
    }
    catch(error){
        console.error("An error occurred:", error);
        return res.status(500).json({ error: "An error occurred" });
    }
}

const getTest = async(req,res) => {
    const {id} = req.params;  // history_id


    try{
        const test = await History.findOne({_id : id})
        return res.status(202).json(test);
    }
    catch(error){
        console.error("An error occurred:", error);
        return res.status(500).json({ error: "An error occurred" });
    }
}


export {getHistory, getTest};