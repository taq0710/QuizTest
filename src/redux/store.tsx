"use client"
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import quizReducer from "./features/quiz/quizSlide"
import loginReducer from "./features/login/loginSlide"

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    login: loginReducer,
    quiz: quizReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



