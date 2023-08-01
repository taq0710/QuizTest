import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Answer, Quiz, QuizDetail, QuizResponse, QuizState } from "./interface";
import { RootState } from "@/redux/store";

const initialState: QuizState = {
  isLoading: false,
  error: "",
  listQuiz: [],
  currentPage: 0,
  totalPage: 0,
  quizDetail: {
    _id: "",
    id: 0,
    userId: "",
    title: "",
    subtitle: "",
    thumb: "",
    type: "question",
    sourceId: "",
    category: "",
    views: 0,
    questions: [],
    results: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  quizDetailAnswer: [],
  listLinkPhoto: [],
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    getQuizList: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    getListQuizSuccess: (state, action: PayloadAction<QuizResponse>) => {
      state.isLoading = false;
      state.listQuiz = [...action.payload.data];
      state.currentPage = action.payload.currentPage;
      state.totalPage = action.payload.totalPage;
    },
    getListQuizFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getQuiz: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    getQuizSuccess: (state, action: PayloadAction<QuizDetail>) => {
      state.isLoading = false;
      state.quizDetail = action.payload;
    },
    getQuizFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getQuizAnswer: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    getQuizAnswerSuccess: (state, action: PayloadAction<Answer[]>) => {
      state.isLoading = false;
      state.quizDetailAnswer = action.payload;
    },
    getQuizAnswerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    sendPhoto: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    sendPhotoSuccess: (state, action: PayloadAction<string[]>) => {
      state.isLoading = false;
      state.listLinkPhoto = action.payload;
    },
    sendPhotoFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearQuizDetail: (state, action: PayloadAction) => {
      state.quizDetail = {
        _id: "",
        id: 0,
        userId: "",
        title: "",
        subtitle: "",
        thumb: "",
        type: "question",
        sourceId: "",
        category: "",
        views: 0,
        questions: [],
        results: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      state.quizDetailAnswer = [];
    },
  },
});

export const {
  getQuizList,
  getListQuizSuccess,
  getListQuizFailure,
  getQuiz,
  getQuizSuccess,
  getQuizFailure,
  getQuizAnswer,
  getQuizAnswerSuccess,
  getQuizAnswerFailure,
  sendPhoto,
  sendPhotoSuccess,
  sendPhotoFailure,
  clearQuizDetail,
} = quizSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsLoading = (state: RootState) => state.quiz.isLoading;
export const selectError = (state: RootState) => state.quiz.error;
export const selectQuizList = (state: RootState) => state.quiz.listQuiz;
export const selectQuizDetail = (state: RootState) => state.quiz.quizDetail;
export default quizSlice.reducer;
