import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import factories from "./factories";
import { ISendPhoto } from "./interface";
import { getListQuizFailure, getListQuizSuccess, getQuiz, getQuizAnswer, getQuizAnswerFailure, getQuizAnswerSuccess, getQuizFailure, getQuizList, getQuizSuccess, sendPhoto, sendPhotoFailure, sendPhotoSuccess } from "./quizSlide";

function* getListQuiz(){
  yield takeEvery(getQuizList().type,function* (payload: PayloadAction){
    try{
      const quizList:any = yield call(()=>factories.requestQuizList())
      console.log(quizList)
      yield put({
        type:getListQuizSuccess.type,
        payload:quizList.data.data
      })
    }catch(error){
      console.log("error")
      yield put({
        type:getListQuizFailure.type,
        payload:error
      })
    }
  })
}
function* getQuizDetail(){
  yield takeEvery(getQuiz().type,function*(payload:PayloadAction<string>){
    try{
      const quizDetail:any = yield call(()=>factories.requestQuiz(payload.payload))
      if(quizDetail){
        yield put({
          type:getQuizSuccess.type,
          payload:quizDetail.data.data
        })
      }else{
        yield put({
          type:getQuizFailure.type,
        })
      }
    }catch(error){
      yield put({
        type:getQuizFailure.type,
        payload:error
      })
    }
  })
}
function* getQuizDetailAnswer(){
  yield takeEvery(getQuizAnswer().type,function*(payload:PayloadAction<string>){
    try{
      const quizDetail:any = yield call(()=>factories.requestQuizAnswer(payload.payload))
      if(quizDetail){
        yield put({
          type:getQuizAnswerSuccess.type,
          payload:quizDetail.data.data
        })
      }else{
        yield put({
          type:getQuizAnswerFailure.type,
        })
      }
    }catch(error){
      yield put({
        type:getQuizAnswerFailure.type,
        payload:error
      })
    }
  })
}
function* sendImage() {
  yield takeEvery(
    sendPhoto.type,
    function* (payload: PayloadAction<ISendPhoto>) {
      try {
        const response: any = yield call(() =>
          factories.sendPhoto(payload.payload)
        );
        yield put({
          type:sendPhotoSuccess.type,
          payload: response,
        });
      } catch (error) {
        yield put({
          type:sendPhotoFailure.type,
          payload: error,
        });
      }
    }
  );
}
export default function* rootSaga() {
  yield all([
    fork(getListQuiz),
    fork(getQuizDetail),
    fork(getQuizDetailAnswer),
    fork(sendImage),
  ]);
}