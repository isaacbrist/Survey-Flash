import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//Page to display the completion message for the respondent
function RespondentCompletion() {
  const history = useHistory();
   const handleBackClick = () => {
    console.log(
      'You clicked the back button!'
    );
    history.push('/respondent-survey');
   }
    // const handleTemporaryClick = () => {
    //   console.log(
    //     'You clicked the Temporary Button. '
    //   );
    //   history.push('/');
    // };

  return (
  
   
      <div className='container'>
        <h2>Thank you for completing the survey, quick as a flash!</h2>
      </div>
    
   
  );
}

export default RespondentCompletion;
