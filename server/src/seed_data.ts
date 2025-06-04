import mongoose from 'mongoose';
import axios from 'axios';
import Question from './models/QuizQuestion';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


const seedQuizData = async () => {
  await mongoose.connect('mongodb://localhost:27017/trivia-app');
  await Question.deleteMany({});

  const categories = [
  { id: 9, name: 'General Knowledge' },
  { id: 11, name: 'Entertainment: Film' },
  { id: 12, name: 'Entertainment: Music' }
];

  for (const {id, name} of categories) {
    console.log(`Seeding ${name} category...`);

    for (const difficulty of ['easy', 'medium', 'hard']) {
      const url = `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${difficulty}&type=multiple`;
      const { data } = await axios.get(url);
      

      const formatted = data.results.map((q: any) => ({
        question: q.question,
        correct_answer: q.correct_answer,
        category: name,
        difficulty: q.difficulty,
        incorrect_answers: q.incorrect_answers
      }));
      await Question.insertMany(formatted);
      // too many requests will cause this api to fail so we need to wait in-between attempts
      await sleep(10000);
    }

  }

  console.log('Data seeding is complete');
  process.exit();
};

seedQuizData();