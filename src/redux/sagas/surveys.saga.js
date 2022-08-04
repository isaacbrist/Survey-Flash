import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SURVEYS" actions
function* fetchSurveys() {
  try {
    const response = yield axios.get('/api/surveys');
    console.log('Get all surveys:', response.data);
    yield put({ type: 'SET_SURVEYS', payload: response.data });
  } catch (error) {
    console.log('Get all surveys error', error);
  }
}

function* fetchQuestions(action) {
  try {
    console.log('Action.payload is:', action.payload)
    const response = yield axios.get(`/api/questions/${action.payload}`);
    console.log('Get all questions:', response.data);
    yield put({ type: 'SET_QUESTIONS', payload: response.data });
  } catch (error) {
    console.log('Get all questions error in surveys saga', error);
  }
}
function* deleteSurvey(action) {
  try {
    console.log('Action.payload is:', action.payload);
    const response = yield axios.delete(`/api/surveys/${action.payload}`);
    console.log('Delete this survey, here is the response.data:', response.data);
    //do I need a response from delete?
    yield put({ type: 'FETCH_SURVEYS' });
  } catch (error) {
    console.log('Delete this survey error: error in surveys saga', error);
  }
}
function* surveysSaga() {
  yield takeEvery('FETCH_SURVEYS', fetchSurveys);
  yield takeEvery('FETCH_QUESTIONS', fetchQuestions);
  yield takeEvery('DELETE_SURVEY', deleteSurvey)

}

export default surveysSaga;
