export interface QuizState {
  isLoading: boolean;
  error: string;
  listQuiz: Quiz[];
  currentPage:number;
  totalPage:number;
  quizDetail: QuizDetail;
  quizDetailAnswer:Answer[];
  listLinkPhoto:string[]
}
export interface Answer{
  id:number;
  answer:string
}
export interface Quiz {
  _id: string;
  id: number;
  userId: string;
  title: string;
  subtitle: string;
  thumb: string;
  type: "question" | "game";
  sourceId: string;
  category: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface QuizDetail {
  _id: string;
  id: number;
  userId: string;
  title: string;
  subtitle: string;
  thumb: string;
  type: "question" | "game";
  sourceId: string;
  category: string;
  views: number;
  questions: Question[];
  results: Result[];
  createdAt: Date;
  updatedAt: Date;
}
export interface Question {
  question: string;
  answers: IAnswer[];
  image: string;
}
export interface IAnswer {
  value: string;
  isCorrect?: boolean;
}
export interface Result {
  title: string;
  subtitle: string;
  thumb: string;
}
export interface QuizResponse {
  totalPage: number;
  currentPage: number;
  data:Quiz[]
}
export interface ISendPhoto{
  files:string[]
}