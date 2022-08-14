import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function YourSurveysItem(props) {



  
  const history = useHistory();
  const dispatch = useDispatch();
  //
  const handleEditClick = (event) => {
    event.preventDefault()
    //dispatch survey info to the redux store and then route user to the edit store
    //goes to the edit survey reducer
    dispatch({ type: 'SET_EDIT_SURVEY', payload: props.survey });
    console.log('Here is the props.survey', props.survey);
    //goes to the
    dispatch({ type: 'FETCH_QUESTIONS', payload: props.survey.id });
    history.push('/your-surveys-edit');
  };

  const handleDeleteClick = (event) => {
        event.preventDefault();
    console.log(
      'You clicked the delete button! Here is that id',
      props.survey.id
    );
    dispatch({ type: 'DELETE_SURVEY', payload: props.survey.id });
   
  };

  //this button will have to dispatch the id of the asurvey to a new reducer to keep the id temporarily so that the 
  //qr code could grab it and so that the correct questions render for the respondent.
  const handleStartClick = (event) => {
        event.preventDefault();
    console.log(
      'You clicked the Start Survey button! Here is the id of the survey',
      props.survey.id
    );
    dispatch({type: 'SEND_SURVEY_ID', payload: props.survey.id})
    history.push('/your-surveys-start-survey');
  };
  return (
    <TableRow
      sx={{
        '&:last-child td &:last-child th': { border: 1, textAlign: 'center' },

        '& button': { m: 1, padding: 1, backgroundColor: '#FCCD04', borderRadius: 1 },
        '& button: hover': {
          backgroundColor: '#e0b804',
        },
      }}
    >
      <TableCell component="th" scope="row">
        <Card
          sx={{
            backgroundColor: '#FCCD04',
          }}
        >
          <div>
            <CardActionArea onClick={() => handleEditClick(event)}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  {props.survey.survey_name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </div>
        </Card>
      </TableCell>
      <TableCell align="right">
        <Stack direction="row" spacing={1}>
          <Button
            color="primary"
            className="centerContainer"
            onClick={() => handleStartClick(event)}
            variant="contained"
            size="small"
            endIcon={<SendIcon />}
          >
            <Typography variant="body1">Start Survey</Typography>
          </Button>
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Stack direction="row" spacing={1}>
          <Button
            color="error"
            size="small"
            onClick={() => handleDeleteClick(event)}
            variant="contained"
            endIcon={<DeleteIcon />}
          >
            <Typography variant="body1">Delete</Typography>
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default YourSurveysItem;
