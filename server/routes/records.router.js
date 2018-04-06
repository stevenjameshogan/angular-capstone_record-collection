const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const queryText = `SELECT records.id, records.title, records.artist, records.release_year, records.run_time, records.album_img, 
    genres.name as "genre_name" FROM records JOIN genres ON records.genre_id = genres.genre_id;`;
    pool.query(queryText).then((result) => {
        console.log(result.rows);
        
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error getting records');
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    newRec = req.body;
    console.log(newRec);
    const queryText = `INSERT INTO records (title, artist, genre_id, release_year, run_time, album_img) 
    VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryText, [newRec.title, newRec.artist, newRec.genre_id, newRec.release_year, newRec.run_time, newRec.album_img])
    .then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error adding record');
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
    console.log(req.params);
    const queryText = `DELETE FROM records WHERE id = $1`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Could not delete record from db');
        res.sendStatus(500);
    })
})

module.exports = router;