import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_QUESTIONS_TEMPLATE" actions
function* fetchQuestionTemplates() {
    try {
        const response = yield axios.get('/api/questionTemplate');
        console.log('Get all questionTemplates:', response.data);
        yield put({type: 'SET_QUESTION_TEMPLATE', payload: response.data});
      } catch (error){
        console.log('Get all questionTemplates error', error);
      }
    }

function* questionTemplateSaga() {
    yield takeEvery('FETCH_QUESTION_TEMPLATE', fetchQuestionTemplates);
}

export default questionTemplateSaga;
