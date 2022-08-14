import React from 'react';
import Card from '@mui/material/Card';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function About() {
  return (
    <div>
      <p className="container">About Survey Flash</p>
      <div className="aboutContainer">
        <h3>Technologies Used</h3>
        <ul>
          <li>Javascript</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>SQL</li>
          <li>Node.JS</li>
          <li>Express</li>
          <li>React</li>
          <li>Redux</li>
          <li>Material UI</li>
          <li>goQR.me-QR Code API</li>
        </ul>
        <div>
          <h3>Challenges</h3>
          <ul>
            <li>QR Code API</li>
            <li>Material UI</li>
          </ul>
        </div>
        <div>
          <h3>Future of this App</h3>
          <ul>
            <li>
              Option to add in different types of questions (Multiple Choice,
              true false, etc.)
            </li>
            <li>
              Additional data recieved when viewing responses (Date
              administered, date responded){' '}
            </li>
            <li>Implementation of Graphs</li>

            <li>Prebuilt survey templates with question examples</li>
          </ul>
        </div>
        <div>
          <h3>Thank you</h3>
          <ul>
            <li>My Instructor, Liz</li>
            <li>The Jemisin Cohort</li>
            <li>My coparent</li>
            <li>My kiddos</li>
          </ul>
        </div>
        <Card>
          <div>
            <img src="/images/File.jpg" />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default About;
