const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
  console.log(
    'Here is the req.paramsid in the questions.router',
    req.params.id
  );
  const id = req.params.id;

  const queryText = `SELECT * FROM "survey_question_table" WHERE "survey_id" = $1`;
  pool
    .query(queryText, [id])
    .then((result) => {
      console.log(
        'Here are the result.rows for all the questions', 
        result.rows
      );
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR in questions.router: Get all questions', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  // Update this single question
  console.log('Here is the req.params and req.body', req.params, req.body);
  const id = req.params.id;

  const queryText = `UPDATE survey_question_table SET question = $1 WHERE id = $2`;
  pool
    .query(queryText, [req.body.question, id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
