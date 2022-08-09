import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//Page to display the QR code for survey takers to use to start the survey.
function StartSurvey() {
  const history = useHistory();
  const store = useSelector((store) => store);
    const questions = useSelector((store) => store.respondentQuestions);
    const user = useSelector((store) => store.user);
    
   const handleBackClick = () => {
    console.log(
      'You clicked the back button!'
    );
    history.push('/your-surveys');
   }
    const handleStartClick = () => {
      console.log(
        'You clicked the Start Survey for the respondent. '
      );
      history.push(`/respondent-survey/${user.id}/${questions.survey_id}`);
    };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => handleBackClick()}
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Stack>
      <div>
        <h2>Start the Survey!</h2>
      </div>
      <div>
        <img
          src="https://qrickit.com/api/qr.php?d=https://intense-gorge-67732.herokuapp.com/#/details"
          className="qrCode"  
        />
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => handleStartClick()}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Start Survey
          </Button>
        </Stack>
      </div>
    </>
  );
}

export default StartSurvey;
