import React, { useState }  from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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


function SurveyTemplate(questionT){
  const history = useHistory()
    const dispatch=useDispatch()
   
 //dispatch
    const addSurvey = (event) => {
        console.log();
        event.preventDefault();
        dispatch({
          type: 'ADD_NEW_SURVEY',
          payload: {feeling: feelings}
        });
        handleClick()
      }
    
  //handle button click when the 'Next' button is pressed and go to the next page
  const handleClick=()=>{
    console.log('You clicked this template!', )
    //Once clicked on, will need to add that template to survey_table and bring the admin to the edit page for that survey
    history.push('/your-surveys-edit')
}

    
return(
    <div>      
    <Paper
    className="bColor"
     direction="row"
     justifycontent="center"
     alignitems="center"
     //handleClick(surveyTemplate.id)
     onClick={() => handleClick(addSurvey)}>
           
            <Card >
            <div className="bColor">
            <CardActionArea>
            <Typography 
            
            gutterBottom variant="h4" 
            component="h4">Title of template</Typography>
            <CardContent>
            <Typography 
            
            gutterBottom variant="h5" 
            component="h5">Here are the questions</Typography>
            
            <div>
      {/* beginning of a MUI text box. */}
      <h4>Survey Template</h4>
    <Box
  component="form"
  onSubmit={addSurvey}
  sx={{
    '& > :not(style)': { m: 1, width: '25ch', height: '7ch' },
  }}
  validate
  autoComplete="off"
>
{questionT.map(question => (
                        <Typography item key={question.id}
                        gutterBottom variant="h6" 
                        component="h6">
                        {question.question}
                        </Typography>
                    )
                )}
    
      
  
{/* Text Field */}
  <TextField id="filled-basic" 
          disabled
          placeholder="Rate on a scale of 1-10" 
          label="question" 
          variant="filled" />
      
</Box>
        </div>  
            </CardContent>
            <Button variant="contained" 
            type="submit"
            button="true">
            Add to Surveys
            </Button>
            </CardActionArea>
            </div>
            </Card>
    </Paper>

</div>
   
)
}

export default Feeling