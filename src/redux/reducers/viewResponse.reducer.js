const viewResponseReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RESPONSE':
      return action.payload;
    case 'CLEAR_RESPONSE':
      return [];
    default:
      return state;
  }
};

// questionsReducer will be on the redux state at:
// state.questions
export default viewResponseReducer;
