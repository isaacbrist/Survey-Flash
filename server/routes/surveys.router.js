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

module.exports = router;
