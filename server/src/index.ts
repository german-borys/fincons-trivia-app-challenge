import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes/quiz';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  methods: ['GET', 'POST'],
  credentials: false
}));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/trivia-app');

app.use('/api/trivia-app', routes);
app.listen(4000, () => console.log('Server running on port 4000'));