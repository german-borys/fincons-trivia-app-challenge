import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

import axios from 'axios';

interface Question {
  id: string;
  question: string;
  answers: string[];
  correct_answer?: string; 
}

interface QuizState {
  categories: string[];
  questions: Question[];
  answers: Record<string, string>;
  score: number | null;
}

const initialState: QuizState = {
  categories: [],
  questions: [],
  answers: {},
  score: null
};

export const fetchCategories = createAsyncThunk('quiz/fetchCategories', async () => {
  const res = await axios.get<string[]>('http://localhost:4000/api/trivia-app/categories');
  return res.data;
});

export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async (params: { category: string; difficulty: string; quantity: number }) => {
    const res = await axios.get<Question[]>(
      `http://localhost:4000/api/trivia-app?category=${params.category}&difficulty=${params.difficulty}&quantity=${params.quantity}`
    );
    return res.data;
  }
);

export const submitAnswers = createAsyncThunk(
  'quiz/submitAnswers',
  async (answers: { id: string; selected: string }[]) => {
    const res = await axios.post<{ score: number }>('http://localhost:4000/api/trivia-app/score', {
      answers
    });
    return res.data;
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setAnswer(state, action: PayloadAction<{ id: string; answer: string }>) {
      state.answers[action.payload.id] = action.payload.answer;
    },
    reset(state) {
      state.questions = [];
      state.answers = {};
      state.score = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
      })
      .addCase(submitAnswers.fulfilled, (state, action) => {
        state.score = action.payload.score;
      });
  }
});

export const { setAnswer, reset } = quizSlice.actions;
export const selectQuiz = (state: RootState) => state.quiz;
export default quizSlice.reducer;