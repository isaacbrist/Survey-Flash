import React from 'react';
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



function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory()
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
      <div>      
            <Paper
            className="bColor"
             direction="row"
             justifycontent="center"
             alignitems="center"
             //handleClick(surveyTemplate.id)
             onClick={() => handleClick()}>
                   
                    <Card >
                    <div className="bColor">
                    <CardActionArea>
                    <Typography 
                    
                    gutterBottom variant="h4" 
                    component="h4">Title of template</Typography>
                    <CardContent>
                    <Typography 
                    
                    gutterBottom variant="h5" 
                    component="h5">Description of Template</Typography>
                    </CardContent>
                    </CardActionArea>
                    </div>
                    </Card>
            </Paper>
        
      </div>
      <h3>Welcome, {user.username}!</h3>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
