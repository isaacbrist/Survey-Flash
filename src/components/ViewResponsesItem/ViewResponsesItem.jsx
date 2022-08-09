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
function ViewResponsesItem(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  
  //this button will bring the user to the detailed view of that survey and see the responses
  const handleViewClick = () => {
    
    console.log(
      'You clicked the View Survey button! Here is the id of the survey',
      props.survey.id
    );

   //fetches all the responses for a particular survey
   dispatch({ type: 'FETCH_RESPONSES', payload: props.survey.id });

    history.push('/view-responses-detail');
  };
  return (
    <div>
      <Paper
        className="bColor"
        direction="row"
        justifycontent="center"
        alignitems="center"
      >
        <Card>
          <div className="bColor">
            <CardActionArea onClick={() => handleViewClick()}>
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
    </div>
  );
}

export default ViewResponsesItem;
