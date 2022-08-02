const questionTemplateReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_QUESTION_TEMPLATE':
      return action.payload;
    case 'UNSET_QUESTION_TEMPLATE':
      return [];
    default:
      return state;
  }
};

// questionTemplate will be on the redux state at:
// state.questionTemplate
export default questionTemplateReducer;
