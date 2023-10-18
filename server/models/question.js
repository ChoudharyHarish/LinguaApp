import mongoose from "mongoose";

// note for later we can make set of questions like each question can have a set id based on user's prefernce we will show him set like if user level/score is from 0-5 in any language then we will give him questions from set 1 to set 5 of that language only

const questionSchema = new mongoose.Schema({
  question : {
    type:String,
    required : true
  },
  
  options : {
    type:[String],
    required : true,
    validator: function (options) {
      return options.length >= 2 && options.length <= 4;
    },
  },
  correctAnswer : {
    type:String,
    required : true
  },
  level: {
    type: Number, // 0 for easy, 1 for medium, 2 for difficulty
    required: true
  },
  language : {
    type:String,
    required : true
  }
});



const Question =  mongoose.model('Question', questionSchema)

export default Question;