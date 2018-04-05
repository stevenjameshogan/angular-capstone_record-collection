const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM genres';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error getting records');
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    const queryText = `INSERT INTO genres (name) VALUES ($1)`;
    pool.query(queryText, [req.body.genre]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error adding genre', error);
        res.sendStatus(500);
    });
})

module.exports = router;