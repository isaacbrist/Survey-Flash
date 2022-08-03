import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//Here is where we can edit an individual survey

function YourSurveysEdit() {

  const dispatch = useDispatch();
  const history = useHistory();
  const editQuestion = useSelector((store) => store.editQuestion);

  function handleChange(event, property) {
    dispatch({ 
                type: 'EDIT_ONCHANGE', 
                payload: { property: property, value: event.target.value }
            });

  }

  // Called when the submit button is pressed
  function handleSubmit(event) {
    event.preventDefault();

    // PUT REQUEST to /youe-surveys/:id
    axios.put(`/your-surveys/${editQuestion.id}`, editQuestion)
        .then( response => {
            // clean up reducer data            
            dispatch({ type: 'EDIT_CLEAR' });

            // refresh will happen with useEffect on Home
            history.push('/'); // back to list
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
        <h2>Edit Student</h2>
      <p>We are editing this student: {editQuestion.question} 
      with id: {editQuestion.id}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => handleChange(event, 'question')}
          placeholder='Question'
          value={editQuestion.question}
        />
        <input type='submit' value='Update Question' />
      </form>
      </div>
  );
}

export default YourSurveysEdit;
