const questionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return action.payload;
    case 'EDIT_QUESTIONS_ONCHANGE': {
      console.log(
        'Here is the action.payload in questions reducer',
        action.payload
      );
    //   let array = state;
      let questionIndex = state.findIndex(
        (obj) => obj.id == action.payload.property
      );
      state[questionIndex].question = action.payload.value;
      return [...state];
    }
    case 'CLEAR_SURVEYS':
      return [];
    default:
      return state;
  }
};

// surveysReducer will be on the redux state at:
// state.surveys
export default questionsReducer;
