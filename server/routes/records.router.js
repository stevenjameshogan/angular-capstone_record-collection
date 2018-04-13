const router = require('express').Router();
const pool = require('../modules/pool');

// GET all records, including genre name (requires SQL table join)
router.get('/', (req, res) => {
    if (req.query.q === undefined){
        const queryText = `SELECT records.id, records.title, records.artist, records.release_year, records.run_time, 
        records.album_img, records.is_favorite, genres.name as "genre_name", genres.genre_id FROM records JOIN genres 
        ON records.genre_id = genres.genre_id ORDER BY records.id;`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            res.sendStatus(500);
        })
    } else {
        const queryText = `SELECT records.id, records.title, records.artist, records.release_year, records.run_time, 
        records.album_img, records.is_favorite, genres.name as "genre_name", genres.genre_id FROM records JOIN genres 
        ON records.genre_id = genres.genre_id ORDER BY records.id;`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error getting records');
            res.sendStatus(500);
        })
    }
})

// POST new record to the database
router.post('/', (req, res) => {
    newRec = req.body;
    const queryText = `INSERT INTO records (title, artist, genre_id, release_year, run_time, album_img) 
    VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryText, [newRec.title, newRec.artist, newRec.genre_id, newRec.release_year, newRec.run_time, newRec.album_img])
    .then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
    })
})

// DELETE record from database based on unique id/params
router.delete('/:id', (req, res) => {
    const queryText = `DELETE FROM records WHERE id = $1`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    })
})

// PUT/EDIT record in database based on unique id
router.put('/:id', (req, res) => {
    let edRec= req.body;
    // If genre_id (primary db key) is undefined from client, do not pass genre_id to database as to retain current genre_id
    if (edRec.genre_id == undefined){
        const queryText = `UPDATE records SET title = $1, artist = $2,
                            release_year = $3, run_time = $4, album_img = $5 , is_favorite = $6 WHERE id = $7;`
        pool.query(queryText, [edRec.title, edRec.artist, edRec.release_year,edRec.run_time, edRec.album_img, 
                            edRec.is_favorite, req.params.id])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error updating');
            res.sendStatus(500);
        });
    // If new genre_id has been received from client, pass new genre_id to database along with rest of new record data
     } else {
        const queryText = `UPDATE records SET title = $1, artist = $2, genre_id = $3,
                            release_year = $4, run_time = $5, album_img = $6, is_favorite = $7 WHERE id = $8;`
        pool.query(queryText, [edRec.title, edRec.artist, edRec.genre_id, edRec.release_year,edRec.run_time, edRec.album_img, 
                            edRec.is_favorite, req.params.id])
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