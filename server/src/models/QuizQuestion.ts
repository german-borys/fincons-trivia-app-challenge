import mongoose, { Schema, Document } from 'mongoose';

export interface QuestionDoc extends Document {
  question: string;  
  correct_answer: string;
  category: string;
  difficulty: string;
  incorrect_answers: string[];
}

const QuestionSchema = new Schema<QuestionDoc>({
  question: String,
  correct_answer: String,
  category: String,
  difficulty: String,
  incorrect_answers: [String]
});

export default mongoose.model<QuestionDoc>('Question', QuestionSchema);