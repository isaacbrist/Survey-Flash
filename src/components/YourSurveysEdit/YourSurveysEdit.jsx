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
  const editSurveyName = useSelector((store) => store.editSurvey);
  const questions = useSelector((store) => store.questions);
  //function to handle edit of a question
  function handleChange(event, property) {
    dispatch({
      type: 'EDIT_ONCHANGE',
      payload: { property: property, value: event.target.value },
    });
  }

  function handleQuestionsChange(event, property) {
    dispatch({
      type: 'EDIT_QUESTIONS_ONCHANGE',
      payload: { property: property, value: event.target.value },
    });
  }
  //function to tell a saga to do a put request
  // function handleUpdateAll(event) {
  //   dispatch({
  //     type: 'UPDATE_ALL',
  //   });
  //   //go back to your surveys
  //   history.push('/your-surveys');
  // }

  // Called when the submit button is pressed
  function handleSubmitName(event) {
    event.preventDefault();
    console.log('You clicked the submit button');
    //for sending both the questions and the title. add data in after the editSurvey
    // const data={ editSurvey, questions}
    // PUT REQUEST to /surveys/:id
    axios
      .put(`/api/surveys/${editSurveyName.id}`, editSurveyName)
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

  function handleSubmitQuestion(event, question) {
    event.preventDefault();
    console.log('You clicked the submit question button');
    console.log('Here is the question', question);
    // PUT REQUEST to /questions/:id
    axios
      .put(`/api/questions/${question.id}`, question)
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
      <h3>Title of Survey: {editSurveyName.survey_name}</h3>
      {/* <p>We are editing this question: {editSurvey.question} 
      with id: {editSurvey.id}
      </p> */}
      <form onSubmit={handleSubmitName}>
        <input
          onChange={(event) => handleChange(event, 'survey_name')}
          placeholder="Survey Name"
          value={editSurveyName.survey_name}
        />
        <input type="submit" value="Update Survey" />
      </form>
      {/* map through all the questions linked to this survey */}
      <div>
        <form onSubmit={handleSubmitQuestion}>
          {questions.map((question) => (
            <Grid item key={question.id} xs={2}>
              <h3>Content of Question: {question.question}</h3>

              <input
                onChange={(event) => handleQuestionsChange(event, question.id)}
                placeholder="Question"
                value={question.question}
              />
              <input type="submit" value="Update Question" />
            </Grid>
          ))}
        </form>
      </div>
      {/* <Button onClick={(event) => handleUpdateAll(event)}>
        Save
      </Button> */}
    </div>
  );
}

export default YourSurveysEdit;
