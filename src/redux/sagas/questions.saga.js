import axios from 'axios';
import { useSelector } from 'react-redux';
import { put, takeEvery } from 'redux-saga/effects';
// const allQuestions = useSelector((store) => store.questions);
// worker Saga: will be fired on "FETCH_QUESTIONS" actions
//get all questions
function* fetchQuestions(action) {
  try {
    console.log('Action.payload is:', action.payload);
    const response = yield axios.get(`/api/questions/${action.payload}`);
    console.log('Get all questions:', response.data);
    yield put({ type: 'SET_QUESTIONS', payload: response.data });
  } catch (error) {
    console.log('Get all questions error in surveys saga', error);
  }
}
//update an individual question
function* updateQuestions(action) {
  try {
    //trying to finish the put request for all the questions
    console.log(
      'Updating all the questions. Here is all the questions',
      allQuestions
    );
    const response = yield axios.put(`/api/questions`, allQuestions);
  } catch (error) {
    console.log('Get all questions error in surveys saga', error);
  }
}
//post/add an individual question
function* postQuestions(action) {
  try {
    console.log('Here is the postquestions action.payload', action.payload);
    const response = yield axios.post('/api/questions', action.payload);
    // yield put({ type: 'FETCH_QUESTIONS', payload: response.data });
  } catch (error) {
    console.log('Post this question error: error in questions saga', error);
  }
}
//delete an individual question
function* deleteQuestion(action) {
  try {
    console.log('Here is the delete questions Action.payload:', action.payload);
    const response = yield axios.delete(`/api/questions/${action.payload}`);
    console.log(
      'Delete this question, here is the response.data:',
      response.data
    );
  } catch (error) {
    console.log('Delete this question error: error in question saga', error);
  }
}
function* fetchRespondentQuestions(action) {
  try {
    console.log('Here is the fetchRespondentQuestions, Action.payload is:', action.payload);
    const response = yield axios.get(`/api/questions/${action.payload}`);
    console.log('Get all questions for the respondent:', response.data);
    yield put({ type: 'SET_RESPONDENT_QUESTIONS', payload: response.data });
  } catch (error) {
    console.log('Get all questions error in surveys saga', error);
  }
}
function* questionsSaga() {
  yield takeEvery('FETCH_QUESTIONS', fetchQuestions);
  yield takeEvery('UPDATE_ALL', updateQuestions);
  yield takeEvery('ADD_QUESTION', postQuestions);
  yield takeEvery('DELETE_QUESTION', deleteQuestion);
   yield takeEvery('SEND_SURVEY_ID', fetchRespondentQuestions)
}

export default questionsSaga;
