import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import YourSurveysItem from '../YourSurveysItem/YourSurveysItem';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';

//this will list all surveys from one user and will have a button
//where they can edit it
function YourSurveys() {
  const theme = useTheme();
  const user = useSelector((store) => store.user);
  const user_id = user.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const surveys = useSelector((store) => store.surveys);
  const [survey_name, set_survey_name] = useState('');
  //buttons not rendering because of this dispatch?
  useEffect(() => {
    console.log('Getting all surveys', user_id);
    dispatch({ type: 'FETCH_SURVEYS', payload: user_id });
  }, []);

  const handleAddClick = () => {
    console.log('You clicked the add button!');
    dispatch({ type: 'ADD_SURVEY', payload: { user_id, survey_name } });

    set_survey_name('');
  };

  return (
    // <Container
    // color="primary">
    <div>
      <div className="container">
        <p>Here are all of Your Surveys!</p>
      </div>

      <h3 className="centerContainer">Add a new survey!</h3>
      <Box
        component="form"
        onSubmit={handleAddClick}
        className="centerContainer"
        sx={{
          display: 'flex',

          '& > :not(style)': { m: 1, width: '20ch', height: '7ch' },
          '& button': {
            m: 1,
            padding: 3,
            width: '25px',
            height: '25',
            backgroundColor: '#FCCD04',
            borderRadius: 1,
          },
          '& button: hover': {
            backgroundColor: '#fdd835',
          },
        }}
        validate="true"
        autoComplete="off"
      >
        <Card
          className="centerContainer"
          sx={{
            backgroundColor: '#FCCD04',
            minWidth: 350,

            '& > :not(style)': { m: 1, width: '25ch', height: '7ch' },
            '& button': {
              m: 1,
              padding: 3,
              width: '25px',
              height: '25',
              backgroundColor: '#FCCD04',
            },
            '& button: hover': {
              backgroundColor: '#e0b804',
            },
          }}
        >
          <TextField
            id="filled-basic"
            color="primary"
            placeholder="Survey Name"
            value={survey_name}
            onChange={(event) => set_survey_name(event.target.value)}
            label="Title"
            variant="filled"
          />

          <Button
            size="small"
            type="submit"
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </Card>
      </Box>

      <TableContainer sx={{ width: 700, margin: 'auto' }} component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead className="tableHeader">
            <TableRow>
              <TableCell align="center">
                <Typography component="h3">Title </Typography>
              </TableCell>
              <TableCell>
                {' '}
                <Typography component="h3">Start Your Survey</Typography>
              </TableCell>
              <TableCell>
                {' '}
                <Typography component="h3">Delete Survey</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          {surveys.map((survey) => (
            <TableBody key={survey.id} className="tableBody">
              <YourSurveysItem survey={survey} />
            </TableBody>
          ))}
        </Table>
      </TableContainer>

      {/* </Container> */}
    </div>
  );
}

export default YourSurveys;
