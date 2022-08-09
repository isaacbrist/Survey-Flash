import React, { useEffect, useState } from 'react';
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
  const user_id = user.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const surveys = useSelector((store) => store.surveys);
  const [survey_name, set_survey_name] = useState('');

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
    <>
      <div className="container">
        <p>Here are all of Your Surveys!</p>
      </div>
      <div>Add a new survey!</div>
      <form onSubmit={handleAddClick}>
        <input
          type="text"
          placeholder="Survey Name"
          value={survey_name}
          onChange={(event) => set_survey_name(event.target.value)}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
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
