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
  console.log('Here is the req.params and req.body', req.params, req.body)
  const id = req.params.id;
  const questions = req.body.questions;
  
  const queryText = `UPDATE survey_table SET survey_name = $1 WHERE id = $2`;
  pool
    .query(queryText, [req.body.survey_name, id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  // Delete this survey
  console.log('Here is the req.params.id', req.params.id)
  const idToDelete = req.params.id;
  const queryText = `DELETE FROM survey_table WHERE id = $1`;
  pool 
    .query(queryText, [idToDelete])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});
module.exports = router;
