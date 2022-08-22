import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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
//back button click handler
  const handleBackClick = () => {
    console.log('You clicked the back button!');
    history.push('/your-surveys');
  };
  //handle start survey button
  const handleStartClick = () => {
    console.log(
      'You clicked the Start Survey for the respondent. Here is the survey_id',
      activeSurveyId
    );
    history.push(`/respondent-survey/${activeSurveyId}`);
  };

  // this will set the qr code to bring others to the specified survey
  const setQR = () => {
    axios
      .get(`/api/response/get/${activeSurveyId}/qrCode`)
      .then((response) => {
        setQrCode(response.data.qrCode);
      })
      .catch((err) => {
        console.error('problem setting QR code', err);
      });
  };

  return (
    <div className="centerContainer2">
      <div className="container">
        <p>Start the Survey!</p>
      </div>
      {/* back button */}
      <Box
        sx={{
          // '& > :not(style)': { m: 1, width: 'auto', height: '79px' },
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
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => handleBackClick()}
            variant="contained"
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </Stack>
      </Box>

      <div>
        {' '}
        {/* <Box
          component="div"
        
          className="centerContainer"
          sx={{
      

            '& > :not(style)': { display: 'flex', p:2, width: '300px', height: '300px' },
           
          }}
     
        >
          <Card
            className="centerContainer"
            sx={{
              backgroundColor: '#FCCD04',
              minWidth: 200,

              
            }}
          >
         
              <img src={qrCode} />
         
          </Card>
        </Box> */}
        {/* /respondent-survey/{activeSurveyId} */}
        {/* <img
          src="https://api.qrserver.com/v1/create-qr-code/?data=https://frozen-sands-52026.herokuapp.com?/#/respondent-survey35&amp;size=100x100"
          className="qrCode"
        /> */}
        {/* <Button onClick={setQR()}>Get QR Code</Button> */}
        <div>
          <img src={qrCode} />
        </div>
        <Box className='centerContainer'
          sx={{
            display: 'flex',
            '& > :not(style)': { m: 1, width: 'auto' },
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
          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => handleStartClick()}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Start Survey
            </Button>
          </Stack>
        </Box>
      </div>
    </div>
  );
}

export default StartSurvey;

