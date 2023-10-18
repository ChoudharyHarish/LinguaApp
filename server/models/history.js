import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question' // Reference the question schema
    }],
    score : {
        type : Number  // score of particular test
    },
    date: {
        type: Date, 
        default: Date.now,
    },
    noOfCorrect : Number,
    noOfInCorrect : Number,
})


const History =  mongoose.model('History', historySchema);
export default History;