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


function* surveysSaga() {
  yield takeEvery('FETCH_SURVEYS', fetchSurveys);

}

export default surveysSaga;
