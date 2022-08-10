// import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
// const user= useSelector((store) => store.user);
// const userId=user.id
// worker Saga: will be fired on "FETCH_SURVEYS" actions
function* fetchSurveys(action) {
  try {
    console.log('FetchSurveys, action.payload is', action.payload);
    const response = yield axios.get(`/api/surveys/${action.payload}`);
    // console.log('Get all surveys:', response.data);
    yield put({ type: 'SET_SURVEYS', payload: response.data });
  } catch (error) {
    console.log('Get all surveys error', error);
  }
}

function* deleteSurvey(action) {
  try {
    console.log('Action.payload is:', action.payload);
    const response = yield axios.delete(`/api/surveys/${action.payload}`);
    console.log(
      'Delete this survey, here is the response.data:',
      response.data
    );
    //do I need a response from delete?
    // yield put({ type: 'FETCH_SURVEYS', payload: userId });
  } catch (error) {
    console.log('Delete this survey error: error in surveys saga', error);
  }
}

function* postSurvey(action) {
  try {
    const response = yield axios.post('/api/surveys', action.payload);
    // yield put({ type: 'FETCH_SURVEYS', payload: userId});
  } catch (error) {
    console.log('Post this survey error: error in surveys saga', error);
  }
}

function* surveysSaga() {
  yield takeLatest('FETCH_SURVEYS', fetchSurveys);
  yield takeEvery('DELETE_SURVEY', deleteSurvey);
  yield takeEvery('ADD_SURVEY', postSurvey);
}

export default surveysSaga;
