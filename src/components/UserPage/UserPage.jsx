import React, { useEffect } from 'react';
import './UserPage.css';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@mui/material/IconButton';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import SurveyTemplate from '../SurveyTemplate/SurveyTemplate';

function UserPage() {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const questionTs = useSelector((store) => store.questionTemplate);

  useEffect(() => {
    console.log('Getting all templates');
    dispatch({ type: 'FETCH_QUESTION_TEMPLATE' });
  }, []);

 
  //Once clicked on, will need to add that template to survey_table and bring the admin to the edit page for that survey

  //dispatch
  const addSurvey = (event) => {
    // console.log();
    // event.preventDefault();
    // dispatch({
    //   type: 'ADD_NEW_SURVEY',
    //   payload: { newSurvey: questionTs },
    // });
    handleClick();
  };


  const handleClick = () => {
    console.log('You clicked this template!');

    history.push('/your-surveys');
  };

//----------------code for stretch goal-----
  //  <section className="question-template">
  //    {/* questionTs is the question from the question template table */}
  //    <Grid container spacing={5}>
  //      {questionTs.map((questionT) => (
  //        <Grid item key={questionT.id} xs={2}>
  //          {/* Maps through the SurveyTemplate component to list all questions for that template */}

  //          {questionT.question}
  //        </Grid>
  //      ))}
  //      <Button
  //        variant="contained"
  //        type="submit"
  //        onClick={() => addSurvey(event)}
  //        button="true"
  //      >
  //        Add to Surveys
  //      </Button>
  //    </Grid>
  //  </section>;
  return (
    <div className="container">
      <div>
        <h2>Welcome, {user.username}!</h2>
      
          <Card className="aboutContainer">
            <div className="centerContainer">
              <Typography gutterBottom variant="h5" component="h5">
                Click on the Your Surveys Button at the top right to get
                started!
              </Typography>
            </div>
          </Card>
      
      </div>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
