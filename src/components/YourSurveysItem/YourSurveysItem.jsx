import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
function YourSurveysItem(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  //
  const handleEditClick = () => {
    //dispatch survey info to the redux store and then route user to the edit store
    //goes to the edit survey reducer
    dispatch({ type: 'SET_EDIT_SURVEY', payload: props.survey });
    console.log('Here is the props.survey', props.survey);
    //goes to the
    dispatch({ type: 'FETCH_QUESTIONS', payload: props.survey.id });
    history.push('/your-surveys-edit');
  };

  const handleDeleteClick = () => {
    console.log(
      'You clicked the delete button! Here is that id',
      props.survey.id
    );
    dispatch({ type: 'DELETE_SURVEY', payload: props.survey.id });
  };

  //this button will have to dispatch the id of the asurvey to a new reducer to keep the id temporarily so that the 
  //qr code could grab it and so that the correct questions render for the respondent.
  const handleStartClick = () => {
    
    console.log(
      'You clicked the Start Survey button! Here is the id of the survey',
      props.survey.id
    );
    dispatch({type: 'SEND_SURVEY_ID', payload: props.survey.id})
    history.push('/your-surveys-start-survey');
  };
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => handleStartClick()}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Start Survey
        </Button>
      </Stack>
      <Paper
        className="bColor"
        direction="row"
        justifycontent="center"
        alignitems="center"
      >
        <Card>
          <div className="bColor">
            <CardActionArea onClick={() => handleEditClick()}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  {props.survey.survey_name} {props.survey.administered}{' '}
                  {props.survey.date_administered}
                </Typography>
              </CardContent>
            </CardActionArea>
          </div>
        </Card>
      </Paper>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => handleDeleteClick()}
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Stack>
    </div>
  );
}

export default YourSurveysItem;
