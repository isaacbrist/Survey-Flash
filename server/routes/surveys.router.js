const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/', (req, res) => {
  const query = `SELECT * FROM "survey_table" ORDER BY "id" ASC`;
  pool
    .query(query)
    .then((result) => {
      console.log(
        'Here are the result.rows for all the surveys',
        result.rows
      );
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all surveys', err);
      res.sendStatus(500);
    });
});
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});
router.put('/:id', (req, res) => {
  // Update this single title
  const idToUpdate = req.params.id;
  const queryText = `UPDATE survey_table SET survey_name = $1 WHERE id = $2`;
  pool
    .query(queryText, [req.body.survey_name, idToUpdate])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});
module.exports = router;
