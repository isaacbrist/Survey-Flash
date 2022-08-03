const editSurveysReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EDIT_SURVEY':
      console.log('Here is the action .payload in the editSurvey.reducer', action.payload)
      return action.payload;
      case'EDIT_ONCHANGE':{
        return{
            //spread-give me all of the object
            ...state,
            //change this one in particular
            [action.payload.property]: action.payload.value
        }
    }
    default:
      return state;
  }
};

// surveys will be on the redux state at:
// state.surveys
export default editSurveysReducer;
