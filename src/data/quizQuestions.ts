import { QuizQuestion } from "../types/quizQuestionType";
import { categories } from "./categories";

export const quizQuestions: QuizQuestion[] = [
  // Web Development
  {
    question: 'What does HTML stand for?',
    options: ['HyperText Markup Language', 'Hyperlink Text Markup Language', 'Highly Textual Markup Language'],
    correctAnswer: 0,
    category: categories[0],
  },
  {
    question: 'What does CSS stand for?',
    options: ['Cascading Style Sheets', 'Central Style Sheets', 'Custom Style Sheets'],
    correctAnswer: 0,
    category: categories[0],
  },
  {
    question: 'Which of the following is a server-side scripting language?',
    options: ['JavaScript', 'PHP', 'CSS'],
    correctAnswer: 1,
    category: categories[0],
  },
  // Databases
  {
    question: 'Which database management system is based on the SQL language?',
    options: ['MySQL', 'MongoDB', 'Redis'],
    correctAnswer: 0,
    category: categories[1],
  },
  {
    question: 'Which database model is based on key-value pairs?',
    options: ['Relational database', 'Document database', 'Graph database'],
    correctAnswer: 1,
    category: categories[1],
  },
  {
    question: 'Which of the following is not a SQL command?',
    options: ['SELECT', 'UPDATE', 'DECLARE'],
    correctAnswer: 2,
    category: categories[1],
  },
  // Programming Languages
  {
    question: 'Which programming language is known for its use in web development?',
    options: ['Python', 'Java', 'JavaScript'],
    correctAnswer: 2,
    category: categories[2],
  },
  {
    question: 'Which programming language is often used for scientific computing and data analysis?',
    options: ['R', 'C++', 'Ruby'],
    correctAnswer: 0,
    category: categories[2],
  },
  {
    question: 'Which of the following is an object-oriented programming language?',
    options: ['HTML', 'CSS', 'Java'],
    correctAnswer: 2,
    category: categories[2],
  },
  // Programming Tools
  {
    question: 'Which code editor is developed by Microsoft?',
    options: ['Visual Studio Code', 'Atom', 'Sublime Text'],
    correctAnswer: 0,
    category: categories[3],
  },
  {
    question: 'Which version control system is widely used in software development?',
    options: ['Git', 'SVN', 'Mercurial'],
    correctAnswer: 0,
    category: categories[3],
  },
  {
    question: 'Which of the following is a task runner and build tool for JavaScript projects?',
    options: ['Grunt', 'Gulp', 'Webpack'],
    correctAnswer: 1,
    category: categories[3],
  },
  // Add more questions in the desired categories
];
