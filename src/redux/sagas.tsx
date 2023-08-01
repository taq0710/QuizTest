import { all } from 'redux-saga/effects';
import quizSaga from "./features/quiz/quizSaga"
import loginSaga from "./features/login/loginSaga"
export default function* rootSaga() {
  yield all([
    quizSaga(),
    loginSaga(),
  ]);
}
