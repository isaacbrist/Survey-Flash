const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// POST request
//  An async/await function that inserts responses to surveys
// If one query fails, they all do and are rolledback
router.post('/', async (req, res) => {
  console.log('Here is the req.body in questions/response router', req.body);

  const newAnswer = req.body.responseData;
  const connection = await pool.connect();

  try {
    // Start my connection 
    await connection.query('BEGIN');
    const queryText = `INSERT INTO "responses_table" ("survey_id", "name", "question", "response")
    values ($1, $2, $3, $4);`;

    // Loops through req.body and makes a new post for each response
    for (let answer of newAnswer) {
      await connection.query(queryText, [
        answer.survey_id,
        answer.name,
        answer.question,
        answer.response,
      ]);
    }

    //  When everything finishes successfully, commit it and send a 201 response to the frontend.
    await connection.query('COMMIT;');
    res.sendStatus(201);
  } catch (error) {
    //  If something breaks, roll everything back and send a 500 error to the frontend
    await connection.query('ROLLBACK;');
    console.log('error in response.router-post', error);
    res.sendStatus(500);
  } finally {
    //  Release our connection
    connection.release();
  }
});

module.exports = router;