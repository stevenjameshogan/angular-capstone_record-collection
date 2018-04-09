const router = require('express').Router();
const pool = require('../modules/pool');

// GET genres from database as well as counts of # of records in each genre (via SQL join)
router.get('/', (req, res) => {
    const queryText = `SELECT genres.name, genres.genre_id, count(records.genre_id) as count, string_agg(records.album_img, ',') 
    as img_list FROM genres LEFT JOIN records ON genres.genre_id = records.genre_id  
    GROUP BY genres.name, genres.genre_id ORDER BY count DESC;`
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    })
})

// POST new genre to database
router.post('/', (req, res) => {
    const queryText = `INSERT INTO genres (name) VALUES ($1)`;
    pool.query(queryText, [req.body.genre]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
    });
})

// DELETE genre from database based on unique genre_id
router.delete('/:id', (req, res) => {
    const queryText = `DELETE FROM genres WHERE genre_id = $1`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    })
})

// PU/EDIT genre name in database based on unique genre_id
router.put('/:id', (req, res) => {
    const queryText = `UPDATE genres SET name = $1 WHERE genre_id = $2`
    pool.query(queryText, [req.body.name, req.params.id])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            res.sendStatus(500);
        })
})


module.exports = router;