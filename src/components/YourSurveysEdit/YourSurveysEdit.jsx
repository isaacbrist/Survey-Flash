import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from '@mui/material/AppBar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Toolbar from '@mui/material/Toolbar';

import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//Here is where we can edit an individual survey

function YourSurveysEdit() {
  const [openName, setOpenName] = React.useState(false);
  const [openQuestion, setOpenQuestion] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const handleNameOpen = () => {
    setOpenName(true);
    handleClose()
  };

  const handleNameClose = () => {
    setOpenName(false);
  };
  const handleQuestionOpen = () => {
    setOpenQuestion(true);
    handleClose();
  };

  const handleQuestionClose = () => {
    setOpenQuestion(false);
  };


  
  // useEffect(() => {
  //   console.log('Getting all questions');
  //   dispatch({ type: 'FETCH_QUESTIONS', payload: survey_id });
  // }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  const editSurveyName = useSelector((store) => store.editSurvey);
  const questions = useSelector((store) => store.questions);
  const [question, setQuestion] = useState('');
  const survey_id = editSurveyName.id;
  //function to handle edit of a question
  function handleChange(event, property) {
    dispatch({
      type: 'EDIT_ONCHANGE',
      payload: { property: property, value: event.target.value },
    });
  }

  function handleQuestionsChange(event, property) {
    dispatch({
      type: 'EDIT_QUESTIONS_ONCHANGE',
      payload: { property: property, value: event.target.value },
    });
  }

  // function to tell a saga to do a put request
  function handleUpdateAll(event) {
    console.log('Here are all the questions that we are updating', questions);
    dispatch({
      type: 'UPDATE_ALL',
      payload: { questions, survey_id },
    });
 
    handleClose();
  }

  // Called when the submit button is pressed
  //updates the name of the survey and question (Question is not updating in the db properly yet)
  function handleSubmitName(event) {
    event.preventDefault();
    console.log('You clicked the submit button');
    //for sending the title.

    // PUT REQUEST to /surveys/:id
    axios
      .put(`/api/surveys/${editSurveyName.id}`, editSurveyName)
      .then((response) => {})
      .catch((error) => {
        console.log('error on PUT: ', error);
      });
    setOpenName(false);
  }

  //Adds a new question
  const handleAddClick = () => {
    console.log('You clicked the add button!');
    console.log('survey_id is:', survey_id);
    dispatch({ type: 'ADD_QUESTION', payload: { survey_id, question } });
   
    setQuestion('');
    setOpenQuestion(false);
  };
  //deletes a question
  const handleDeleteClick = (event, id) => {
    console.log('You clicked the delete button! Here is that id', id);
    dispatch({ type: 'DELETE_QUESTION', payload: id });
  };
  //back button
  const handleBackClick = () => {
    console.log('You clicked the back button!');
    handleUpdateAll();
    history.push('/your-surveys');
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1, backgroundColor: 'FCCD04' }}>
        <AppBar position="static" className="tableItems">
          <Toolbar className="appBar">
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {editSurveyName.survey_name}
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ m: 'auto' }}
              >
                <EditIcon
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleNameOpen}> Edit Title</MenuItem>
                  <MenuItem onClick={handleQuestionOpen}>
                    {' '}
                    Add Question
                  </MenuItem>
                  <MenuItem onClick={(event) => handleUpdateAll(event)}>
                    {' '}
                    Save all edits
                  </MenuItem>
                </Menu>
              </IconButton>
            </Typography>

            {/* <Box
              component="form"
              onSubmit={handleAddClick}
              className="centerContainer"
              sx={{
                display: 'flex',

                '& > :not(style)': { m: 1, width: 'auto', height: '79px' },
                '& button': {
                  m: 1,
                  padding: 1,
                  width: 'auto',
                  height: 'auto',
                  backgroundColor: '#FCCD04',
                  borderRadius: 1,
                  color: 'black',
                },
                '& button: hover': {
                  backgroundColor: '#fdd835',
                },
              }}
              autoComplete="off"
            >
              <Card
                className="tableItems"
                sx={{
                  minWidth: 250,
                  backgroundColor: '#FCCD04',
                  '& > :not(style)': { width: 'auto', height: 'auto' },
                  '& button': {
                    width: 'auto',
                    height: 'auto',
                    backgroundColor: '#FCCD04',
                  },
                  '& button: hover': {
                    backgroundColor: '#fdd835',
                  },
                }}
              >
                <CardContent className="tableItems">
                  {' '}
                  <Stack direction="row" spacing={3}>
                    <Button
                      size="small"
                      className="centerContainer"
                      variant="contained"
                      onClick={handleNameOpen}
                    >
                      Edit Title
                    </Button>
                    <Button
                      size="small"
                      className="centerContainer"
                      variant="contained"
                      onClick={handleQuestionOpen}
                    >
                      Add Question
                    </Button>
                    <Button
                      variant="contained"
                      onClick={(event) => handleUpdateAll(event)}
                    >
                      Save all edits
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box> */}
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          // '& > :not(style)': { m: 1, width: 'auto', height: '79px' },
          '& button': {
            width: 'auto',
            height: 'auto',
            backgroundColor: '#FCCD04',
            borderRadius: 1,
            color: 'black',
          },
          '& button: hover': {
            backgroundColor: '#fdd835',
          },
        }}
      >
        <Stack direction="row" spacing={1}>
          <Button
            onClick={() => handleBackClick()}
            variant="contained"
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </Stack>
      </Box>

      <Dialog open={openName} onClose={handleNameClose}>
        <DialogTitle className="tableHeader">Update Title</DialogTitle>
        <DialogContent className="tableItems">
          <DialogContentText>Update the Name of Your Survey</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="filled-basic"
            color="primary"
            label="Title"
            variant="filled"
            onChange={(event) => handleChange(event, 'survey_name')}
            placeholder="Survey Name"
            value={editSurveyName.survey_name}
            fullWidth
          />
        </DialogContent>

        <DialogActions className="tableItems">
          <Button onClick={handleNameClose}>Cancel</Button>
          <Button onClick={handleSubmitName}>Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openQuestion} onClose={handleQuestionClose}>
        <DialogTitle className="tableHeader">New Question</DialogTitle>
        <DialogContent className="tableItems">
          <DialogContentText>Add a question!</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="filled-basic"
            color="primary"
            label="Your Question"
            variant="filled"
            type="text"
            placeholder="Type your question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions className="tableItems">
          <Button onClick={handleQuestionClose}>Cancel</Button>
          <Button onClick={handleAddClick}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit the name of the survey */}
      {/* <Box
        component="form"
        onSubmit={handleSubmitName}
        className="centerContainer"
        sx={{
          display: 'flex',

          '& > :not(style)': { m: 1, width: 'auto', height: '79px' },
          '& button': {
            m: 1,
            padding: 1,
            width: 'auto',
            height: 'auto',
            backgroundColor: '#FCCD04',
            borderRadius: 1,
            color: 'black',
          },
          '& button: hover': {
            backgroundColor: '#fdd835',
          },
        }}
        autoComplete="off"
      >
        <Card
          className="tableItems"
          sx={{
            minWidth: 250,
            backgroundColor: '#FCCD04',
            '& > :not(style)': { width: 'auto', height: 'auto' },
            '& button': {
              width: 'auto',
              height: 'auto',
              backgroundColor: '#FCCD04',
            },
            '& button: hover': {
              backgroundColor: '#fdd835',
            },
          }}
        >
          <CardContent className="tableItems">
            {' '}
            <TextField
              id="filled-basic"
              color="primary"
              label="Title"
              variant="filled"
              onChange={(event) => handleChange(event, 'survey_name')}
              placeholder="Survey Name"
              value={editSurveyName.survey_name}
            />{' '}
            <Button
              type="submit"
              size="small"
              className="centerContainer"
              variant="contained"
            >
              Update Name
            </Button>
          </CardContent>
        </Card>
      </Box> */}

      {/* New question button/form */}

      {/* map through all the questions linked to this survey so that you can edit */}
      <div>
        <TableContainer sx={{ width: 700, margin: 'auto' }} component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead className="tableHeader">
              <TableRow>
                <TableCell align="center">
                  <Typography component="h3">Question </Typography>
                </TableCell>
                <TableCell align="center">
                  {' '}
                  <Typography component="h3">Edit</Typography>
                </TableCell>
                <TableCell>
                  {' '}
                  <Typography component="h3">Delete Question</Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            {questions.map((question) => (
              <TableBody key={question.id} className="tableBody">
                <TableRow
                  sx={{
                    '&:last-child td &:last-child th': {
                      border: 1,
                      textAlign: 'center',
                    },

                    '& button': {
                      m: 1,
                      padding: 1,
                      backgroundColor: '#FCCD04',
                      borderRadius: 1,
                      color: 'black',
                    },
                    '& button: hover': {
                      backgroundColor: '#e0b804',
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Card
                      sx={{
                        textAlign: 'center',
                        display: 'flex-box',
                        alignContent: 'center',
                        margin: 'auto',
                        maxHeight: 200,
                        maxWidth: 200,
                        minWidth: 200,
                      }}
                    >
                      <div>
                        <CardContent className="tableItems">
                          <Typography variant="body1" gutterBottom>
                            {question.question}
                          </Typography>
                        </CardContent>
                      </div>
                    </Card>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Card
                      sx={{
                        textAlign: 'center',
                        display: 'flex-box',
                        alignContent: 'center',
                        margin: 'auto',
                        maxHeight: 80,
                        maxWidth: 250,
                      }}
                    >
                      <div>
                        <CardContent className="tableItems">
                          <TextField
                            id="filled-basic"
                            color="primary"
                            label="Question"
                            variant="filled"
                            type="text"
                            onChange={(event) =>
                              handleQuestionsChange(event, question.id)
                            }
                            placeholder="Question"
                            value={question.question}
                          />
                        </CardContent>
                      </div>
                    </Card>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        className="centerContainer"
                        onClick={() => handleDeleteClick(event, question.id)}
                        variant="contained"
                        endIcon={<DeleteIcon />}
                      >
                        <Typography variant="body1">Delete</Typography>
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
        {/*          
              <h3> {question.question}</h3>

              <TextField
                id="filled-basic"
                required
                color="primary"
                label="Question"
                variant="filled"
                type="text"
                onChange={(event) => handleQuestionsChange(event, question.id)}
                placeholder="Question"
                value={question.question}
              /> */}

        {/* <input type="submit" value="Update Question" /> */}

        {/* <Button
                className="centerContainer"
                onClick={() => handleDeleteClick(event, question.id)}
                variant="contained"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button> */}
      </div>
    </div>
  );
}

export default YourSurveysEdit;
