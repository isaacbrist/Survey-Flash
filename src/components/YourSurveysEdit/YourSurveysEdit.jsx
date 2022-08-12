import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { padding } from '@mui/system';

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
    <>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Questions</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Delete</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <div>
        <div className="container">
          <p>Edit Your Survey</p>
        </div>
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
        {/* Edit the name of the survey */}

        <form onSubmit={handleSubmitName}>
          <TextField
            id="filled-basic"
            required
            color="primary"
            label="Title"
            variant="filled"
            onChange={(event) => handleChange(event, 'survey_name')}
            placeholder="Survey Name"
            value={editSurveyName.survey_name}
          />

          <Button
            type="submit"
            size="small"
            className="centerContainer"
            variant="contained"
          >
            Update Name
          </Button>
        </form>
        {/* New question button/form */}
        <div>Add a new question!</div>
        <form onSubmit={handleAddClick}>
          <TextField
            id="filled-basic"
            required
            color="primary"
            label="Your Question"
            variant="filled"
            type="text"
            placeholder="Type your question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />

          <Button type="submit" variant="contained">
            Add
          </Button>
        </form>

        <h3>{editSurveyName.survey_name}</h3>

        {/* map through all the questions linked to this survey so that you can edit */}
        <div>
          {questions.map((question) => (
            <div key={question.id} xs={2}>
              <h3> {question.question}</h3>

              <TextField
                id="filled-basic"
                required
                color="primary"
                label="Question"
                variant="filled"
                type="text"
                onChange={(event) => handleQuestionsChange(event, question.id)}
                placeholder="Question"
                value={question.question}
              />

              {/* <input type="submit" value="Update Question" /> */}

              <Button
                className="centerContainer"
                onClick={() => handleDeleteClick(event, question.id)}
                variant="contained"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
        <Button variant="contained" onClick={(event) => handleUpdateAll(event)}>
          Save all edits
        </Button>
      </div>
    </>
  );
}

export default YourSurveysEdit;
