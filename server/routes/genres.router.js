const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const queryText = `SELECT genres.name, genres.genre_id, count(records.genre_id) FROM genres LEFT JOIN records 
    ON genres.genre_id = records.genre_id  GROUP BY genres.name, genres.genre_id;`
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

router.delete('/:id', (req, res) => {
    const queryText = `DELETE FROM genres WHERE genre_id = $1`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Could not delete from db');
        res.sendStatus(500);
    })
})




module.exports = router;