const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM records';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error getting records');
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    newRec = req.body;
    console.log('Trying to post record', newRec);
    const queryText = `INSERT INTO records (title, artist, genre, release_year, run_time, album_img) 
    VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryText, [newRec.title, newRec.artist, newRec.genre, newRec.release_year, newRec.run_time, newRec.album_img])
    .then((result) => {
        console.log('We added', newRec);
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error adding record');
        res.sendStatus(500);
    })
})





module.exports = router;