import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { getProposal, getProposalFailure, getProposalSuccess } from '../reducers/user';
// import userFactories from '../services/user';

function* handleGetProposalById() {
  yield takeEvery(getProposal.type, function* (payload: PayloadAction<string>) {
    try {
      // const response: any = yield call(() => userFactories.getUser());
      // yield put({
      //   type: getProposalSuccess.type,
      //   payload: response.data,
      // });
    } catch (error) {
      yield put({
        type: getProposalFailure.type,
        payload: error,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(handleGetProposalById)]);
}
