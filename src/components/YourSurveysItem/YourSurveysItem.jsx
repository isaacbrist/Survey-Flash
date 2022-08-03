import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@mui/material/IconButton';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@material-ui/core/Paper';

function YourSurveysItem({ survey }) {
  const history = useHistory();
  const dispatch = useDispatch();
  //
  const handleEditClick = (id) => {
    //dispatch survey info to the redux store and then route user to the edit store
    dispatch({ type: 'SET_EDIT_SURVEY', payload: id });

    history.push('/your-surveys-edit');
  };
  return (
    <div>
      <Paper
        className="bColor"
        direction="row"
        justifycontent="center"
        alignitems="center"
        onClick={() => handleEditClick(survey.id)}
      >
        <Card>
          <div className="bColor">
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  {survey.survey_name} {survey.administered}{' '}
                  {survey.date_administered}
                </Typography>
              </CardContent>
            </CardActionArea>
          </div>
        </Card>
      </Paper>
    </div>
  );
}

export default YourSurveysItem;
