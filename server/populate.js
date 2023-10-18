import dotenv from 'dotenv';
dotenv.config();

import { connectDb } from './db/connection.js';
import Question from './models/Question.js';

import * as questions from './questions.json' assert { type: 'json' };


const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL)
    await Question.deleteMany()
    await Question.create(questions.default)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()