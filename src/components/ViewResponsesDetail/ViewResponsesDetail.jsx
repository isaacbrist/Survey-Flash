import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Here is where we can see the responses for an individual survey

function ViewResponsesDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const responses = useSelector((store) => store.viewResponse);

  //back button
  const handleBackClick = () => {
    console.log('You clicked the back button!');
    history.push('/view-responses');
  };
  return (
    <div>
      <div className="container">
        <p>View Your Responses</p>
      </div>
      {/* Back button */}
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

      <TableContainer sx={{ width: 800, margin: 'auto' }} component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead className="tableHeader">
            <TableRow>
              <TableCell>
                <Typography component="h3">Name </Typography>
              </TableCell>
              <TableCell>
                <Typography component="h3">Question </Typography>
              </TableCell>
              <TableCell>
                <Typography component="h3">Response </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {/* map through all the questions and responses linked to this survey */}
          <TableBody className="tableBody">
            {responses?.map((response) => (
              <TableRow
                sx={{
                  '&: &:last-child th': { border: 1, textAlign: 'center' },
                  '& button': { m: 1, padding: 1 },
                }}
                key={response.id}
                xs={2}
              >
                <TableCell component="th" scope="row">
                  <Card>
                    <Typography className="tableItems" component="h3">
                      {response.name}{' '}
                    </Typography>
                  </Card>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Card>
                    <Typography className="tableItems" component="h3">
                      {response.question}{' '}
                    </Typography>
                  </Card>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Card>
                    <Typography className="tableItems" component="h3">
                      {response.response}{' '}
                    </Typography>
                  </Card>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ViewResponsesDetail;
