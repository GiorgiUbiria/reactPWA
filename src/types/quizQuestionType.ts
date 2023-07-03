import { CategoryType } from "./categoryType";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  category: CategoryType;
  [key: string]: unknown;
};
