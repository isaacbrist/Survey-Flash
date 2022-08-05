import axios from 'axios';
import { useSelector } from 'react-redux';
import { put, takeEvery } from 'redux-saga/effects';
// const allQuestions = useSelector((store) => store.questions);
// worker Saga: will be fired on "FETCH_QUESTIONS" actions

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

function* postQuestions(action) {
  try {
    console.log('Here is the postquestions action.payload', action.payload)
    const response = yield axios.post('/api/questions', action.payload);
    // yield put({ type: 'FETCH_QUESTIONS', payload: response.data });
  } catch (error) {
    console.log('Post this question error: error in questions saga', error);
  }
}

function* questionsSaga() {
  yield takeEvery('FETCH_QUESTIONS', fetchQuestions);
  yield takeEvery('UPDATE_ALL', updateQuestions);
  yield takeEvery('ADD_QUESTION', postQuestions);
}

export default questionsSaga;
