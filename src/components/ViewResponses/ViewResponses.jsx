import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import ViewResponsesItem from '../ViewResponsesItem/ViewResponsesItem';
//this will list all surveys that have been administered from one user and will have a button
//where they can view it
function ViewResponses() {
  const user = useSelector((store) => store.user);
  const user_id = user.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const surveys = useSelector((store) => store.surveys);

  useEffect(() => {
    console.log('Getting all surveys');
    dispatch({ type: 'FETCH_SURVEYS', payload: user_id });
  }, []);

  return (
    <>
      <div className="container">
        <p>View responses</p>
      </div>
      <Grid container spacing={5}>
        {surveys.map((survey) => (
          <Grid item key={survey.id} xs={2}>
            <ViewResponsesItem survey={survey} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}


export default ViewResponses;
