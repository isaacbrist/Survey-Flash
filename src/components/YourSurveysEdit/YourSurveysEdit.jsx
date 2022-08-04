import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';

//Here is where we can edit an individual survey

function YourSurveysEdit() {
  //  useEffect(() => {
  //    console.log('Getting all surveys');
  //    dispatch({ type: 'FETCH_QUESTIONS' });
  //  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  const editSurvey = useSelector((store) => store.editSurvey);
  const questions = useSelector((store) => store.questions);
  //function to handle edit of a question
  function handleChange(event, property) {
    dispatch({
      type: 'EDIT_ONCHANGE',
      payload: { property: property, value: event.target.value },
    });
  }
  //function to tell a saga to do a put request
  function handleUpdateAll(event) {
    dispatch({
      type: 'UPDATE_ALL'
      
    });
    //go back to your surveys
    history.push('/your-surveys');
  }
  //handlechange will take in id of question
  //payload: id: id
  //question
  // Called when the submit button is pressed
  function handleSubmit(event) {
    event.preventDefault();

    // PUT REQUEST to /your-surveys/:id
    axios
      .put(`/api/surveys/${editSurvey.id}`, editSurvey)
      .then((response) => {
        // clean up reducer data
        // dispatch({ type: 'EDIT_CLEAR' });
        // refresh will happen with useEffect on Home
        // history.push('/'); // back to list
      })
      .catch((error) => {
        console.log('error on PUT: ', error);
      });
  }

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
          placeholder="Survey Name"
          value={editSurvey.survey_name}
        />
        <input type="submit" value="Update Survey" />
      </form>
      {/* map through all the questions linked to this survey */}
      <div>
        {questions.map((question) => (
          <Grid item key={question.id} xs={2}>
            <h3>Content of Question: {question.question}</h3>
            <form onSubmit={handleSubmit}>
              <input
                onChange={(event) => handleChange(event, 'question')}
                placeholder="Question"
                value={question.question}
              />
              <input type="submit" value="Update Question" />
            </form>
          </Grid>
        ))}
      </div>
      <Button onClick={(event) => handleUpdateAll(event)}>
        Save all edits
      </Button>
    </div>
  );
}

export default YourSurveysEdit;
