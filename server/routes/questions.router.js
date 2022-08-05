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

router.post('/', (req, res) => {
    console.log('Here is the req.body in questions router', req.body)
  const newQuestion = req.body;
  const queryText = `INSERT INTO "survey_question_table" ("survey_id", "question")
    values ($1, $2);`;

  pool
    .query(queryText, [newQuestion.survey_id, newQuestion.question])
    .then((result) => {
      res.send(result.rows);
      console.log(`POST successful in questions.router:`, result.rows);
    })
    .catch((err) => {
      console.log(`ERR in /questions router`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
