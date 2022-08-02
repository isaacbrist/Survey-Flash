import React, { useEffect } from 'react';
import './UserPage.css';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@mui/material/IconButton';
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import Typography from '@mui/material/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import SurveyTemplate from '../SurveyTemplate/SurveyTemplate';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory()
  const questionTs = useSelector(store => store.questionTemplate);

  useEffect(() => {
    console.log('Getting all templates')
      dispatch({ type: 'FETCH_QUESTION_TEMPLATE' });
  }, []);

//   const history = useHistory()
//   const handleClick=()=>{
//     console.log('You clicked this template!', )
//     //Once clicked on, will need to add that template to survey_table and bring the admin to the edit page for that survey
//     history.push('/your-surveys-edit')
// }
 //dispatch
 const addSurvey = (event) => {
  console.log();
  event.preventDefault();
  dispatch({
    type: 'ADD_NEW_SURVEY',
    payload: {questions: questionTs}
  });
  handleClick()
}

//handle button click when the 'Next' button is pressed and go to the next page
const handleClick=()=>{
console.log('You clicked this template!', )
//Once clicked on, will need to add that template to survey_table and bring the admin to the edit page for that survey
history.push('/your-surveys-edit')
}

  return (
    <div className="container">
      <div>
      <Paper
            className="bColor"
             direction="row"
             justifycontent="center"
             alignitems="center"
             >
                    <Card >
                    <div className="bColor">
                    <Typography 
                    gutterBottom variant="h3" 
                    component="h3">Click on a template to get started!</Typography>
                    </div>
                    </Card>
            </Paper>
      </div>
      <section className="question-template">
        {/* questionTs is the question from the question template table */}
                <Grid container spacing={5}>
                {questionTs.map(questionT => (
                        <Grid item key={questionT.id} xs={2}>
                          {/* Maps through the SurveyTemplate component to list all questions for that template */}
                          
                           {questionT.question}
                        </Grid>
                    )
                )}
                <Button variant="contained" 
            type="submit"
            onClick={() => addSurvey(event)}
            button="true">
            Add to Surveys
            </Button>
                </Grid>

            </section>
     
      <h3>Welcome, {user.username}!</h3>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
