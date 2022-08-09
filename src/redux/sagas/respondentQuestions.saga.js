import axios from 'axios';
import { useSelector } from 'react-redux';
import { put, takeEvery } from 'redux-saga/effects';

//get all questions for this id

function* fetchRespondentQuestions(action) {
  try {
    console.log(
      'Here is the fetchRespondentQuestions, Action.payload is:',
      action.payload
    );
    const response = yield axios.get(`/api/questions/${action.payload}`);
    console.log('Get all questions for the respondent:', response.data);
    yield put({ type: 'SET_RESPONDENT_QUESTIONS', payload: response.data });
  } catch (error) {
    console.log('Get all questions error in respondentSurvey saga', error);
  }
}
//
function* handleRespondentAnswers(action) {
  try {
    console.log(
      'Here is the handleRespondentQuestions, Action.payload is:',
      action.payload
    );

    yield put({ type: 'SET_RESPONDENT_ANSWERS', payload: action.payload });
  } catch (error) {
    console.log('handleRespondentAnswers ERROR:', error);
  }
}

function* handleSubmitAnswers(action) {
  try {
    console.log(
      'Here is the handleSubmitQuestions, Action.payload is:',
      action.payload
    );
    const response = yield axios.post('/api/response', action.payload);
    yield put({ type: 'CLEAR_RESPONDENT_ANSWERS' });
  } catch (error) {
    console.log('handleSubmitAnswers ERROR:', error);
  }
}
function* respondentQuestionsSaga() {
  yield takeEvery('SEND_SURVEY_ID', fetchRespondentQuestions);
  yield takeEvery('HANDLE_ANSWERS', handleRespondentAnswers);
  yield takeEvery('HANDLE_SUBMIT', handleSubmitAnswers);
}

export default respondentQuestionsSaga;
