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
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SaveIcon from '@mui/icons-material/Save';
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



  // function to handle the submit of all of the respondent's questions and responses
  function handleAnswers(event, property, survey_id, question) {
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
  }

  function handleSubmit() {

    console.log('You clicked the submit button', responseData);
    dispatch({
      type: 'HANDLE_SUBMIT',
      payload: { responseData },
    });
    history.push('/respondent-completion');
  }

  return (
    <div className="centerContainer2">
      <div className="container">
        <p>
          Don't forget to fill out your name. Click the save button after every
          answer!
        </p>
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
      <TableContainer sx={{ width: 700, margin: 'auto' }} component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead className="tableHeader">
            <TableRow>
              <TableCell align="center">
                <Typography component="h3">Question </Typography>
              </TableCell>
              <TableCell align="center">
                {' '}
                <Typography component="h3">Your Answer</Typography>
              </TableCell>
              <TableCell>
                {' '}
                <Typography component="h3">Save</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {/* map through all the questions linked to this survey */}
          {questions.map((question) => (
            <TableBody key={question.id} className="tableBody">
              <TableRow
                sx={{
                  '&:last-child td &:last-child th': {
                    border: 1,
                    textAlign: 'center',
                  },

                  '& button': {
                    m: 1,
                    padding: 1,
                    backgroundColor: '#FCCD04',
                    borderRadius: 1,
                    color: 'black',
                  },
                  '& button: hover': {
                    backgroundColor: '#e0b804',
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  <Card
                    sx={{
                      textAlign: 'center',
                      display: 'flex-box',
                      alignContent: 'center',
                      margin: 'auto',
                      maxHeight: 200,
                      maxWidth: 200,
                      minWidth: 200,
                    }}
                  >
                    <div>
                      <CardContent className="tableItems">
                        <Typography variant="body1" gutterBottom>
                          {question.question}
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Card
                    sx={{
                      textAlign: 'center',
                      display: 'flex-box',
                      alignContent: 'center',
                      margin: 'auto',
                      maxHeight: 80,
                      maxWidth: 250,
                    }}
                  >
                    <div>
                      <CardContent className="tableItems">
                        <TextField
                          id="filled-basic"
                          required
                          placeholder="Your Response"
                          onChange={(event) => setResponse(event.target.value)}
                          label="Answer"
                          variant="filled"
                          value={question.response}
                        />
                      </CardContent>
                    </div>
                  </Card>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      size="large"
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
                      endIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>

      {/* <input type="submit" value="Update Question" /> */}
      <Box className='centerContainer'
        sx={{display: 'flex',
     
          '& button': {
            width: 'auto',
            height: 'auto',
            backgroundColor: '#FCCD04',
            borderRadius: 1,
            color: 'black',
          },
          '& button: hover': {
            backgroundColor: '#fdd835',
          },
        }}
      >
        <Stack direction="row" spacing={1}>
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
        </Stack>
      </Box>
    </div>
  );
}

export default RespondentSurvey;
