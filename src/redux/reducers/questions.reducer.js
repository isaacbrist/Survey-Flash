const questionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return action.payload;
    case 'CLEAR_SURVEYS':
      return [];
    default:
      return state;
  }
};

// questionsReducer will be on the redux state at:
// state.questions
export default questionsReducer;
