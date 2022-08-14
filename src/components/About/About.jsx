import React from 'react';

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
          <li>React</li>
          <li>Redux</li>
          <li>Node.JS</li>
          <li>Material UI</li>
          <li>goQR.me-QR Code API</li>
        </ul>
        <div>
          <h5>Challenges</h5>
          <p>
            There were a few challenges I stumbled across while creating this
            app. I struggled with getting the QR Code API to work. There were
            also some challenges with implementing Material UI.
          </p>
        </div>
        <div>
          <h5>Thank you</h5>
          <ul>
            <li>My Instructor, Liz</li>
            <li>The Jemisin Cohort</li>
            <li>My coparent</li>
            <li>My kiddos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
