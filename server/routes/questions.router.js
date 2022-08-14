const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
  console.log(
    'Here is the req.paramsid in the questions.router',
    req.params.id
  );
  const id = req.params.id;

  const queryText = `SELECT * FROM "survey_question_table" WHERE "survey_id" = $1 ORDER by "id" ASC`;
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

//Post a new question
router.post('/', (req, res) => {
    console.log('Here is the req.body in questions router', req.body)
  const newQuestion = req.body;
  const queryText = `INSERT INTO "survey_question_table" ("survey_id", "question")
    values ($1, $2) RETURNING "survey_id";`;

  pool
    .query(queryText, [newQuestion.survey_id, newQuestion.question])
    .then((result) => {
       console.log('POST in questions routerResult is:', result.rows[0]); //ID IS HERE!
       res.send(result.rows[0]);
      console.log(`POST successful in questions.router:`, result.rows);
    })
    .catch((err) => {
      console.log(`ERR in /questions router`, err);
     res.sendStatus(500);
    });
});


router.put('/:id', async (req, res) => {
  // Update these questions
  console.log('Here is the req.params and req.body', req.params, req.body);
  const newQuestions = req.body.questions;
const connection = await pool.connect();
  try {
    // Start my connection 
    await connection.query('BEGIN');
  const queryText = `UPDATE survey_question_table SET question = $1 WHERE id = $2`;
   // Loops through req.body and makes a new update for each update
  for(let question of newQuestions){
   await connection.query(queryText, [question.question, question.id])
  }
     //  When everything finishes successfully, commit it and send a 201 response to the frontend.
    await connection.query('COMMIT;');
    res.sendStatus(201);
}
    catch(error) {
   //  If something breaks, roll everything back and send a 500 error to the frontend
    await connection.query('ROLLBACK;');
    console.log('error in response.router-post', error);
    res.sendStatus(500);
  } finally {
    //  Release our connection
    connection.release();
  }
});

router.delete('/:id', (req, res) => {
  // Delete this question
  console.log('Here is the req.params.id', req.params.id);
  const idToDelete = req.params.id;
  const queryText = `DELETE FROM survey_question_table WHERE id = $1 RETURNING "survey_id";`;
  pool
    .query(queryText, [idToDelete])
    .then((result) => {
   console.log('Questions Router:Delete Result is:', result.rows[0]);
   res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
