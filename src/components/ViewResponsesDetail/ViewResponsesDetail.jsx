import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Here is where we can see the responses for an individual survey

function ViewResponsesDetail() {

  const dispatch = useDispatch();
  const history = useHistory();
const questions = useSelector((store) => store.questions);
   

//back button
     const handleBackClick = () => {
       console.log('You clicked the back button!');
       history.push('/view-responses');
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
        <p>View Responses-Detail</p>
      </div>
   
      {/* map through all the questions and responses linked to this survey */}
      <div>
       
          {questions.map((question) => (
            <Grid item key={question.id} xs={2}>
              <h5>Question and Response: {question.question}</h5>
              <h6>{question.response}</h6>
            </Grid>
          ))}
       
      </div>
    </div>
  );
}

export default ViewResponsesDetail;
