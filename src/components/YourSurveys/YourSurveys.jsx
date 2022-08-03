import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import YourSurveysItem from '../YourSurveysItem/YourSurveysItem';
//this will list all surveys from one user and will have a button
//where they can edit it
function YourSurveys() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const surveys = useSelector((store) => store.surveys);

  useEffect(() => {
    console.log('Getting all surveys');
    dispatch({ type: 'FETCH_SURVEYS' });
  }, []);

  return (
    <>
      <div className="container">
        <p>Here are all of Your Surveys!</p>
      </div>
      <Grid container spacing={5}>
        {surveys.map((survey) => (
          <Grid item key={survey.id} xs={2}>
            <YourSurveysItem survey={survey} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default YourSurveys;
