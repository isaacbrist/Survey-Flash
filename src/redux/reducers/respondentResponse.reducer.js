const respondentResponseReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RESPONDENT_ANSWERS':
      return [...state, action.payload];
    case 'CLEAR_RESPONDENT_QUESTIONS':
      return [];
    default:
      return state;
  }
};

// questionsReducer will be on the redux state at:
// state.questions
export default respondentResponseReducer;
