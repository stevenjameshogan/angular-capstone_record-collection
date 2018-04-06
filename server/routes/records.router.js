const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const queryText = `SELECT records.id, records.title, records.artist, records.release_year, records.run_time, records.album_img, 
    genres.name as "genre_name" FROM records JOIN genres ON records.genre_id = genres.genre_id;`;
    pool.query(queryText).then((result) => {
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

router.put('/:id', (req, res) => {
    let edRec= req.body;
    console.log(edRec);
    if (edRec.genre_id == undefined){
        const queryText = `UPDATE records SET title = $1, artist = $2,
                            release_year = $3, run_time = $4, album_img = $5 WHERE id = $6;`
        pool.query(queryText, [edRec.title, edRec.artist, edRec.release_year,edRec.run_time, edRec.album_img, 
                            req.params.id])
        .then((result) => {
            console.log('Success updating!');
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error updating');
            res.sendStatus(500);
        });
     } else {
        const queryText = `UPDATE records SET title = $1, artist = $2, genre_id = $3,
                            release_year = $4, run_time = $5, album_img = $6 WHERE id = $7;`
        pool.query(queryText, [edRec.title, edRec.artist, edRec.genre_id, edRec.release_year,edRec.run_time, edRec.album_img, 
                            req.params.id])
        .then((result) => {
            console.log('Success updating!');
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error updating');
            res.sendStatus(500);
        });
     }
});

module.exports = router;