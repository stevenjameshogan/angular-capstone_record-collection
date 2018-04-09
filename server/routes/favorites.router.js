const router = require('express').Router();
const pool = require('../modules/pool');

// GET all records that have been favorited by user
router.get('/', (req, res) => {
    const queryText = `SELECT records.id, records.title, records.artist, records.release_year, records.run_time, 
    records.album_img, records.is_favorite, genres.name as "genre_name" FROM records JOIN genres 
    ON records.genre_id = genres.genre_id WHERE records.is_favorite = true;`
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    })
})


module.exports = router;