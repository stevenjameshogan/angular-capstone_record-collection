const express = require('express');
const app = express();
const PORT = 3086;
const bodyParser = require('body-parser');


// Configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // This line is required for Angular

app.use(express.static('server/public'))

app.listen(PORT, () => {
    console.log('Server swagging on port', PORT);
})