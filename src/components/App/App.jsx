import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserPage from '../UserPage/UserPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import './App.css';
import YourSurveys from '../YourSurveys/YourSurveys';
import YourSurveysEdit from '../YourSurveysEdit/YourSurveysEdit';
import ViewResponses from '../ViewResponses/ViewResponses';
import StartSurvey from '../StartSurvey/StartSurvey';
import RespondentSurvey from '../RespondentSurvey/RespondentSurvey';
import RespondentCompletion from '../RespondentCompletion/RespondentCompletion';
import ViewResponsesDetail from '../ViewResponsesDetail/ViewResponsesDetail';
import About from '../About/About';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {
  const dispatch = useDispatch();
  const activeSurveyId = useSelector((store) => store.activeSurveyId);
  const user = useSelector((store) => store.user);
  let userId = user.id;
  let surveyId = activeSurveyId;

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      primary: {
        light: '#ffca28',
        main: '#ffc107',
        dark: '#ffb300',
      },
      secondary: {
        light: '#ffee58',
        main: '#ffeb3b',
        dark: '#fdd835',
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <Nav />

            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
              <Route exact path="/respondent-survey/:activeSurveyId">
                <RespondentSurvey />
              </Route>
              <Route exact path="/respondent-completion">
                <RespondentCompletion />
              </Route>
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
              <ProtectedRoute
                // logged in shows UserPage else shows LoginPage
                exact
                path="/user"
              >
                <UserPage />
              </ProtectedRoute>
              {/* View all responses to activated surveys */}
              <ProtectedRoute exact path="/view-responses">
                <ViewResponses />
              </ProtectedRoute>
              {/* Detailed view */}
              <ProtectedRoute exact path="/view-responses-detail">
                <ViewResponsesDetail />
              </ProtectedRoute>

              <ProtectedRoute
                // logged in shows YourSurveys else shows LoginPage
                exact
                path="/your-surveys"
              >
                <YourSurveys />
              </ProtectedRoute>
              {/* Edit page */}
              <ProtectedRoute exact path="/your-surveys-edit">
                <YourSurveysEdit />
              </ProtectedRoute>
              <ProtectedRoute exact path="/your-surveys-start-survey">
                <StartSurvey />
              </ProtectedRoute>
              <ProtectedRoute exact path="/about">
                <About />
              </ProtectedRoute>
              <Route exact path="/login">
                {user.id ? (
                  // If the user is already logged in,
                  // redirect to the /user page
                  <Redirect to="/user" />
                ) : (
                  // Otherwise, show the login page
                  <LoginPage />
                )}
              </Route>

              <Route exact path="/registration">
                {user.id ? (
                  // If the user is already logged in,
                  // redirect them to the /user page
                  <Redirect to="/user" />
                ) : (
                  // Otherwise, show the registration page
                  <RegisterPage />
                )}
              </Route>

              <Route exact path="/home">
                {user.id ? (
                  // If the user is already logged in,
                  // redirect them to the /user page
                  <Redirect to="/user" />
                ) : (
                  // Otherwise, show the Landing page
                  <LandingPage />
                )}
              </Route>

              {/* If none of the other routes matched, we will show a 404. */}
              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
          </div>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
