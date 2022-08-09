import axios from 'axios';
import { useSelector } from 'react-redux';
import { put, takeEvery } from 'redux-saga/effects';

//get all responses for this id

function* fetchResponses(action) {
  try {
    console.log(
      'Here is the fetchResponses, Action.payload is:',
      action.payload
    );
    const response = yield axios.get(`/api/response/${action.payload}`);
    console.log('Get all responses for that survey:', response.data);
    yield put({ type: 'SET_RESPONSE', payload: response.data });
  } catch (error) {
    console.log('Get all questions error in responses saga', error);
  }
}
//

function* viewResponseSaga() {
 yield takeEvery('FETCH_RESPONSES', fetchResponses)
}

export default viewResponseSaga;
