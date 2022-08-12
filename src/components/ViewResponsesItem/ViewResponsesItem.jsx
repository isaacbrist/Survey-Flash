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
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
   
      <TableRow
        sx={{
          '&: &:last-child th': { border: 1, textAlign: 'center' },
          '& button': { m: 1, padding: 1 },
        }}
      >
        <TableCell component="th" scope="row">
          <Card>
            <div>
              <CardActionArea onClick={() => handleViewClick()}
                >
                <CardContent>
                  <Typography textAlign='center' gutterBottom variant="h5" component="h3">
                    {props.survey.survey_name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </div>
          </Card>
        </TableCell>
      
      </TableRow>


  );
}

export default ViewResponsesItem;
