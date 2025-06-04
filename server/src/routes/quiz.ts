import express, { Request, Response } from 'express';
import Question from '../models/QuizQuestion';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const { category, difficulty, quantity } = req.query;
  const questions = await Question.aggregate([
    { $match: { category, difficulty } },
    { $sample: { size: parseInt(quantity as string) || 5 } }
  ]);
  const prepared = questions.map((q: any) => {
    const answers = [...q.incorrect_answers, q.correct_answer];
    answers.sort(() => Math.random() - 0.5);
    return { id: q._id, question: q.question, answers, correct_answer: q.correct_answer };
  });
  res.json(prepared);
});

router.get('/categories', async (_: Request, res: Response) => {
  const categories = await Question.distinct('category');
  res.json(categories);
});

router.post('/score', async (req: Request, res: Response) => {
  const { answers } = req.body;
  let correct = 0;

  for (const a of answers) {
    const q = await Question.findById(a.id);
    if (q && q.correct_answer === a.selected) correct++;
  }

  res.json({ score: correct });
});

export default router;