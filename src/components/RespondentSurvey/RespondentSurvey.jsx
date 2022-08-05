import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

//Here is where the respondent responds to questions

function RespondentSurvey() {

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

  // function handleQuestionsChange(event, property) {
  //   dispatch({
  //     type: 'EDIT_QUESTIONS_ONCHANGE',
  //     payload: { property: property, value: event.target.value },
  //   });
  // }


  return (
    <div>
      <div className="container">
        <p>Respondent Survey</p>
      </div>
    
     
      <h2>Name of the user who sent the survey</h2>
      {/* <h3>Title of Survey: {activeSurvey.survey_name}</h3> */}

      <form >
        <input
          
          placeholder="Your Name"
          // value={editSurveyName.survey_name}
        />
        <input type="submit" value="Name" />
      </form>
      {/* map through all the questions linked to this survey */}
      <div>
        <form>
          {questions.map((question) => (
            <Grid item key={question.id} xs={2}>
              <h3>Content of Question: {question.question}</h3>

              <input
                // onChange={(event) => handleQuestionsChange(event, question.id)}
                placeholder="Response"
                
              />
              {/* <input type="submit" value="Update Question" /> */}
            </Grid>
          ))}
        </form>
      </div>
      {/* <Button onClick={(event) => handleUpdateAll(event)}>
        Save all edits

      </Button> */}
    </div>
  );
}

export default RespondentSurvey;
