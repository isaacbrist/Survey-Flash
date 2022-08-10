import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//Page to display the QR code for survey takers to use to start the survey.
function StartSurvey() {
  useEffect(() => {
    setQR();
  }, [activeSurveyId]);
  let [qrCode, setQrCode] = useState('');
  const history = useHistory();

  const activeSurveyId = useSelector((store) => store.activeSurveyId);
  const user = useSelector((store) => store.user);

  const handleBackClick = () => {
    console.log('You clicked the back button!');
    history.push('/your-surveys');
  };
  const handleStartClick = () => {
    console.log(
      'You clicked the Start Survey for the respondent. Here is the survey_id',
      activeSurveyId
    );
    history.push(`/respondent-survey/${activeSurveyId}`);
  };

  // this will set the qr code to bring others to the beginning of the rating pages for this specific wine
  const setQR = () => {
    axios
      .get(`/api/response/${activeSurveyId}/qrCode`)
      .then((response) => {
        setQrCode(response.data.qrCode);
      })
      .catch((err) => {
        console.error('problem setting QR code', err);
      });
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
        {/* /respondent-survey/{activeSurveyId} */}
        {/* <img
          src="https://api.qrserver.com/v1/create-qr-code/?data=https://frozen-sands-52026.herokuapp.com?/#/respondent-survey35&amp;size=100x100"
          className="qrCode"
        /> */}

        <img src={qrCode} />
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

// let [qrCode, setQrCode] = useState('');

// useEffect(() => {
//   // this is to fetch wine detail for the id of the url endpoint
//   setQR();
//   dispatch({ type: 'FETCH_WINE_DETAIL', payload: id });
// }, [id]);
