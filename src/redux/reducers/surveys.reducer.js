const surveysReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SURVEYS':
      return action.payload;
    case 'CLEAR_SURVEYS':
      return [];
    default:
      return state;
  }
};

// surveysReducer will be on the redux state at:
// state.surveys
export default surveysReducer;
