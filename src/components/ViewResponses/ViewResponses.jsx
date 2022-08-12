import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
        <p>This is so that you can view your responses</p>
      </div>
      <TableContainer sx={{ width: 800, margin: 'auto' }} component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography component="h3">Title </Typography>
              </TableCell>
              
            </TableRow>
          </TableHead>

          {surveys?.map((survey) => (
            <TableBody key={survey.id}>
              <ViewResponsesItem survey={survey} />
            </TableBody>
          ))}
        </Table>
      </TableContainer>
     
    </>
  );
}


export default ViewResponses;
