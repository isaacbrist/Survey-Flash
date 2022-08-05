import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

//Here is where we can edit an individual survey

function YourSurveysEdit() {
  // useEffect(() => {
  //   console.log('Getting all questions');
  //   dispatch({ type: 'FETCH_QUESTIONS', payload: survey_id });
  // }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  const editSurvey = useSelector((store) => store.editSurvey);
  const questions = useSelector((store) => store.questions);
  const [question, setQuestion] = useState('');
  const survey_id = editSurvey.id;
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
      type: 'UPDATE_ALL',
    });
    //go back to your surveys
    history.push('/your-surveys');
  }
 

  // Called when the submit button is pressed
  //updates the name of the survey and question (Question is not updating in the db properly yet)
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
//Adds a new question
  const handleAddClick = () => {
    console.log('You clicked the add button!');
    console.log('survey_id is:', survey_id);
    dispatch({ type: 'ADD_QUESTION', payload: { survey_id, question } });
    dispatch({ type: 'FETCH_QUESTIONS', payload: survey_id });
    setQuestion('');
  };
  //deletes a question
  const handleDeleteClick = () => {
    console.log(
      'You clicked the delete button! Here is that id',
      props.survey.id
    );
    dispatch({ type: 'DELETE_SURVEY', payload: props.survey.id });
  };

  return (
    <div>
      <div className="container">
        <p>Your Surveys-Edit</p>
      </div>
      <div>Add a new question!</div>
      <form onSubmit={handleAddClick}>
        <input
          type="text"
          placeholder="Type your question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
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
                onChange={(event) => handleChange(event, question.id)}
                placeholder="Question"
                value={question.question}
              />
              <input type="submit" value="Update Question" />
            </form>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => handleDeleteClick()}
                variant="contained"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Stack>
          </Grid>
        ))}
      </div>
      {/* <Button onClick={(event) => handleUpdateAll(event)}>
        Save all edits
      </Button> */}
    </div>
  );
}

export default YourSurveysEdit;
