import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Here is where we can edit an individual survey

function YourSurveysEdit() {
  // useEffect(() => {
  //   console.log('Getting all questions');
  //   dispatch({ type: 'FETCH_QUESTIONS', payload: survey_id });
  // }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  const editSurveyName = useSelector((store) => store.editSurvey);
  const questions = useSelector((store) => store.questions);
  const [question, setQuestion] = useState('');
  const survey_id = editSurveyName.id;
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

  // function to tell a saga to do a put request
  function handleUpdateAll(event) {
    console.log('Here are all the questions that we are updating', questions)
    dispatch({
      type: 'UPDATE_ALL', payload: {questions, survey_id}
    });
    //go back to your surveys
    history.push('/your-surveys');
  }

  // Called when the submit button is pressed
  //updates the name of the survey and question (Question is not updating in the db properly yet)
  function handleSubmitName(event) {
    event.preventDefault();
    console.log('You clicked the submit button');
    //for sending the title. 

    // PUT REQUEST to /surveys/:id
    axios
      .put(`/api/surveys/${editSurveyName.id}`, editSurveyName)
      .then((response) => {
   
      })
      .catch((error) => {
        console.log('error on PUT: ', error);
      });
  }

  // function handleSubmitQuestion(event, question) {
  //   event.preventDefault();
  //   console.log('You clicked the submit question button');
  //   console.log('Here is the question', question);
  //   // PUT REQUEST to /questions/:id
  //   axios
  //     .put(`/api/questions/${question.id}`, question)
  //     .then((response) => {
    
  //     })
  //     .catch((error) => {
  //       console.log('error on PUT: ', error);
  //     });
  // }
  //Adds a new question
  const handleAddClick = () => {
    console.log('You clicked the add button!');
    console.log('survey_id is:', survey_id);
    dispatch({ type: 'ADD_QUESTION', payload: { survey_id, question } });
    dispatch({ type: 'FETCH_QUESTIONS', payload: survey_id });
    setQuestion('');
  };
  //deletes a question
  const handleDeleteClick = (event, id) => {
    console.log('You clicked the delete button! Here is that id', id);
    dispatch({ type: 'DELETE_QUESTION', payload: id });
    dispatch({ type: 'FETCH_QUESTIONS', payload: survey_id });
  };
//back button
     const handleBackClick = () => {
       console.log('You clicked the back button!');
       history.push('/your-surveys');
     };
  return (
    <div>
      {/* Back button */}
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => handleBackClick()}
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Stack>
      <div className="container">
        <p>Your Surveys-Edit</p>
      </div>
      {/* New question button/form */}
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
      {/* Edit the name of the survey */}
      <h2>Edit Questions and name</h2>
      <h3>Title of Survey: {editSurveyName.survey_name}</h3>

      <form onSubmit={handleSubmitName}>
        <input
          onChange={(event) => handleChange(event, 'survey_name')}
          placeholder="Survey Name"
          value={editSurveyName.survey_name}
        />
        <input type="submit" value="Update Survey" />
      </form>
      {/* map through all the questions linked to this survey so that you can edit */}
      <div>
        {/* <form onSubmit={handleSubmitQuestion}> */}
          {questions.map((question) => (
            <Grid item key={question.id} xs={2}>
              <h3>Content of Question: {question.question}</h3>

              <input
                onChange={(event) => handleQuestionsChange(event, question.id)}
                placeholder="Question"
                value={question.question}
              />
              {/* <input type="submit" value="Update Question" /> */}

              <Stack direction="row" spacing={2}>
                <Button
                  onClick={() => handleDeleteClick(event, question.id)}
                  variant="contained"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Stack>
            </Grid>
          ))}
        {/* </form> */}
      </div>
      <Button onClick={(event) => handleUpdateAll(event)}>
        Save all edits

      </Button>
    </div>
  );
}

export default YourSurveysEdit;
