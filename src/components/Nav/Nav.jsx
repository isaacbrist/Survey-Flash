import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';


function Nav() {
  const user = useSelector((store) => store.user);
  //mui drawer
  // const drawerWidth = 240;

  // const useStyles = makeStyles({
  //   page: {
  //     width: '100%',
  //   },
  //   drawer: {
  //     width: drawerWidth,
  //   },
  //   drawerPaper: {
  //     width: drawerWidth,
  //   },
  //   root: {
  //     display: 'flex',
  //   },
  // });
  // const classes = useStyles();
  return (
    // <div className={classes.root}>
    //   <Drawer
    //     variant="permanent"
    //     anchor="left"
    //     classes={{ paper: classes.drawerPaper }}
    //     className={classes.drawer}
    //   >
    //     <div>
    //       <Typography variant="h5">Hello World</Typography>
    //     </div>
    //   </Drawer>
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">
          {' '}
          <img className="imgLogo" src="/images/lightning.png" />
          Survey Flash
        </h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/view-responses">
              View Responses
            </Link>
            <Link className="navLink" to="/your-surveys">
              Your Surveys
            </Link>
            <Link className="navLink" to="/about">
              About
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
    // </div>
  );
}

export default Nav;
