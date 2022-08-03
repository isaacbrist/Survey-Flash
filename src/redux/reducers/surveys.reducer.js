const surveysReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SURVEYS':
      return action.payload;
    case 'EDIT_SURVEYS':
      return [];
    default:
      return state;
  }
};

// surveys will be on the redux state at:
// state.surveys
export default surveysReducer;
