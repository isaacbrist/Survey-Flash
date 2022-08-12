import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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
  const { activeSurveyId } = useParams();
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  //grab the questions from the questions stored in the respondent questions store
  const questions = useSelector((store) => store.respondentQuestions);
  const responseData = useSelector((store) => store.respondentResponse);
  // const surveyId = useSelector((store) => store.activeSurveyId);
  // makes sure that the questions render
  useEffect(() => {
    console.log('Getting all surveys', activeSurveyId);
    dispatch({ type: 'SEND_SURVEY_ID', payload: activeSurveyId });
  }, []);



  //function to handle the submit of all of the respondent's questions and responses
  // function handleAnswers(event, property, survey_id, question) {
  //   dispatch({
  //     type: 'HANDLE_ANSWERS',
  //     payload: {
  //       property: property,
  //       name: name,
  //       question: question,
  //       survey_id: survey_id,
  //       response: response,
  //     },
  //   });
  //   setResponse('');
  // }

  function handleSubmit(event, property, survey_id, question) {
    dispatch({
      type: 'HANDLE_ANSWERS',
      payload: {
        property: property,
        name: name,
        question: question,
        survey_id: survey_id,
        response: response,
      },
    });
    setResponse('');
    console.log('You clicked the submit button', responseData);
    dispatch({
      type: 'HANDLE_SUBMIT',
      payload: { responseData },
    });
    history.push('/respondent-completion');
  }

  return (
    <div className='centerContainer'>
      <div className="container">
        <p>Survey Flash</p>
      </div>

      {/* <h2>Name of the user who sent the survey</h2> */}
      {/* <h3> {activeSurvey.survey_name}</h3> */}

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
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          label="Your Name"
          variant="filled"
        />
      </Box>
      {/* map through all the questions linked to this survey */}
      <div >
        {questions?.map((question) => (
          <div className="centerContainer" item key={question.id} xs={2}>
            <h5>{question.question}</h5>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch', height: '7ch' },
              }}
              validate
              type="submit"
              autoComplete="off"
            >
              {/* Text Field */}
              <TextField
                id="filled-basic"
                required
                placeholder="Response"
                onChange={(event) => setResponse(event.target.value)}
                label="Question"
                variant="filled"
              />
              <Button
             
                variant="contained"
                size="small"
                onClick={(event) =>
                  handleAnswers(
                    event,
                    question.id,
                    question.survey_id,
                    question.question
                  )
                }
                type="submit"
                button="true"
                endIcon={<SendIcon />}
              >
                Save
              </Button>
            </Box>
            {/* <input type="submit" value="Update Question" /> */}
          </div>
        ))}
        <Button
          variant="contained"
          size="large"
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
