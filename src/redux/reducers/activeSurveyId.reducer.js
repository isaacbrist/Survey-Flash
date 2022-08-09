const activeSurveyIdReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SURVEY_ID':
      return action.payload;
    case 'CLEAR_SURVEYS_ID':
      return [];
    default:
      return state;
  }
};


export default activeSurveyIdReducer;
