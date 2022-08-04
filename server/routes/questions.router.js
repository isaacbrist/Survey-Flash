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
module.exports = router;
