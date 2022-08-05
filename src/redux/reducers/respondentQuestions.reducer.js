const respondentQuestionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RESPONDENT_QUESTIONS':
      return action.payload;
    case 'CLEAR_RESPONDENT_QUESTIONS':
      return [];
    default:
      return state;
  }
};

// questionsReducer will be on the redux state at:
// state.questions
export default respondentQuestionsReducer;
