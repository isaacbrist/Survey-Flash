import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//Here is where we can edit an individual survey

function YourSurveysEdit() {

  const dispatch = useDispatch();
  const history = useHistory();
  const editSurvey = useSelector((store) => store.editSurvey);
//function to handle edit of a question
  function handleChange(event, property) {
    dispatch({ 
                type: 'EDIT_ONCHANGE', 
                payload: { property: property, value: event.target.value }
            });

  }
//handlechange will take in id of question
//payload: id: id
//question
  // Called when the submit button is pressed
  function handleSubmit(event) {
    event.preventDefault();

    // PUT REQUEST to /your-surveys/:id
    axios.put(`/api/surveys/${editSurvey.id}`, editSurvey)
        .then( response => {
            // clean up reducer data            
            // dispatch({ type: 'EDIT_CLEAR' });

            // refresh will happen with useEffect on Home
            // history.push('/'); // back to list
        })
        .catch(error => {
            console.log('error on PUT: ', error);
        })
    
  };


  return (
    <div>
    <div className="container">
      <p>Your Surveys-Edit</p>
    </div>
        <h2>Edit Questions and name</h2>
        <h3>Title of Survey: {editSurvey.survey_name}</h3>
      {/* <p>We are editing this question: {editSurvey.question} 
      with id: {editSurvey.id}
      </p> */}
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => handleChange(event, 'survey_name')}
          placeholder='Survey Name'
          value={editSurvey.survey_name}
        />
        <input type='submit' value='Update Survey' />
      </form>
      </div>
  );
}

export default YourSurveysEdit;
