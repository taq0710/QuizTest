import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import factories from "./factories";

import {
  getUserInfo,
  getUserInfoFailure,
  getUserInfoSuccess,
  loginBySocial,
  loginBySocialFailure,
  loginBySocialSuccess,
  loginHome,
  loginHomeFailure,
  loginHomeSuccess,
  signUp,
  signUpFailure,
  signUpSuccess,
} from "./loginSlide";
import { ILogin, ILoginSocial, ISignUp } from "@/interface";
function* handleLogin() {
  yield takeEvery(loginHome.type, function* (payload: PayloadAction<ILogin>) {
    try {
      const response: any = yield call(() =>
        factories.requestLogin(payload.payload)
      );
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        yield put({
          type: loginHomeSuccess.type,
          payload: response.data.data,
        });
      } else {
        yield put({
          type: loginHomeFailure.type,
          payload: response.data.message,
        });
      }
    } catch (error) {
      yield put({
        type: loginHomeFailure.type,
        // error
      });
    }
  });
}
function* handleLoginBySocial() {
  yield takeEvery(
    loginBySocial.type,
    function* (payload: PayloadAction<ILoginSocial>) {
      try {
        const response: any = yield call(() =>
          factories.requestLoginSocial(payload.payload)
        );
        if (response.data.success) {
          localStorage.setItem("token", response.data.data.token);
          yield put({
            type: loginBySocialSuccess.type,
            payload: response.data.data,
          });
        } else {
          yield put({
            type: loginBySocialFailure.type,
            payload: response.data.message,
          });
        }
      } catch (error) {
        yield put({
          type: loginBySocialFailure.type,
          // error
        });
      }
    }
  );
}
function* handleSignUp() {
  yield takeEvery(signUp.type, function* (payload: PayloadAction<ISignUp>) {
    try {
      const response: any = yield call(() =>
        factories.requestSignUp(payload.payload)
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        yield put({
          type: signUpSuccess.type,
          payload: response.data.data,
        });
      } else {
        yield put({
          type: signUpFailure.type,
          payload: response.data.message,
        });
      }
    } catch (error) {
      yield put({
        type: signUpFailure.type,
        // error
      });
    }
  });
}
function* handleGetUserInfo() {
  yield takeEvery(getUserInfo.type, function* (payload: PayloadAction) {
    try {
      const response: any = yield call(() => factories.getUserInfo());
        yield put({
          type: getUserInfoSuccess.type,
          payload: response,
        });
    } catch (error) {
      yield put({
        type: getUserInfoFailure.type,
        // error
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(handleLogin),
    fork(handleLoginBySocial),
    fork(handleSignUp),
    fork(handleGetUserInfo),
  ]);
}
