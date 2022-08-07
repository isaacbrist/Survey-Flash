import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
//Here is where the respondent responds to questions

function RespondentSurvey() {

   const [name, setName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
//grab the questions from the questions stored in the respondent questions store
  const questions = useSelector((store) => store.respondentQuestions);

  //function to handle edit of a question
  // function handleChange(event, property) {
  //   dispatch({
  //     type: 'EDIT_ONCHANGE',
  //     payload: { property: property, value: event.target.value },
  //   });
  // }
//function to handle the submit of all of the respondent's questions and responses
  function handleAnswers(event) {
    dispatch({
      type: 'HANDLE_ANSWERS',
      payload: {property: property, question: question.question, response: event.target.value },
    });
  }

  function handleSubmit() {
    dispatch({
      type: 'HANDLE_SUBMIT',
      payload: {  value: event.target.value },
    });
    history.push('respondent-completion')
  }

  return (
    <div>
      <div className="container">
        <p>Respondent Survey</p>
      </div>

      <h2>Name of the user who sent the survey</h2>
      {/* <h3>Title of Survey: {activeSurvey.survey_name}</h3> */}

      <Box
        component="form"
        // onSubmit={addSupported}
        sx={{
          '& > :not(style)': { m: 1, width: '25ch', height: '7ch' },
        }}
        validate
        autoComplete="off"
      >
        {/* Text Field */}
        <TextField
          id="filled-basic"
          required
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          label="Your Name"
          variant="filled"
        />
      </Box>
      {/* map through all the questions linked to this survey */}
      <div>
        {questions.map((question) => (
          <Grid item key={question.id} xs={2}>
            <h5>Content of Question: {question.question}</h5>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch', height: '7ch' },
              }}
              validate
              autoComplete="off"
            >
              {/* Text Field */}
              <TextField
                id="filled-basic"
                required
                placeholder="Response"
                onChange={(event) => handleQuestionsSubmit(event)}
                // value={question.question}
                label="Question"
                variant="filled"
              />
            </Box>
            {/* <input type="submit" value="Update Question" /> */}
          </Grid>
        ))}
        <Button
          variant="contained"
          size=""
          onClick={handleSubmit}
          type="submit"
          button="true"
          endIcon={<SendIcon />}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default RespondentSurvey;
