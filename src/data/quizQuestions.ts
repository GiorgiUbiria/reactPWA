import { QuizQuestion } from "../types/quizQuestionType";
import { categories } from "./categories";

export const quizQuestions: QuizQuestion[] = [
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
  {
    question: 'What is the purpose of CSS in web development?',
    options: ['To style the appearance of web pages', 'To define the structure of web pages', 'To handle server-side logic'],
    correctAnswer: 0,
    category: categories[0],
  },
  {
    question: 'Which HTML element is used to define a hyperlink?',
    options: ['&lt;a&gt;', '&lt;p&gt;', '&lt;div&gt;'],
    correctAnswer: 0,
    category: categories[0],
  },
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
  {
    question: 'What is the primary key in a relational database?',
    options: ['A unique identifier for each row in a table', 'A table that stores primary data', 'A foreign key linking two tables'],
    correctAnswer: 0,
    category: categories[1],
  },
  {
    question: 'Which database model is based on a network structure and uses pointers to navigate between records?',
    options: ['Relational database', 'Hierarchical database', 'Object-oriented database'],
    correctAnswer: 1,
    category: categories[1],
  },
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
  {
    question: 'Which programming language is primarily used for Android app development?',
    options: ['Swift', 'Kotlin', 'Objective-C'],
    correctAnswer: 1,
    category: categories[2],
  },
  {
    question: 'What is the main advantage of using a statically typed programming language?',
    options: ['Faster development process', 'Better memory management', 'Early error detection'],
    correctAnswer: 2,
    category: categories[2],
  },
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
  {
    question: 'Which tool is commonly used for unit testing in JavaScript projects?',
    options: ['Jasmine', 'Mocha', 'Selenium'],
    correctAnswer: 1,
    category: categories[3],
  },
  {
    question: 'What is the purpose of a linter in software development?',
    options: ['To optimize code performance', 'To enforce coding style and catch errors', 'To automatically generate documentation'],
    correctAnswer: 1,
    category: categories[3],
  },
];