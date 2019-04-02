const express = require('express');
const bodyParser = require('body-parser');
const sensors = require('./api/routes/sensors');
const maps = require('./api/routes/maps');
const locations = require('./api/routes/locations');
const cors = require('cors');


const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', sensors);
app.use('/', maps);
app.use('/', locations);

//404
app.use((req, res) => {
    return res.status(404).send({ message : `404 Requested route ${req.url} was not found`});
})

//500
app.use((req, res) => {
    return res.status(500).send({ message : `Internal server error`});
})
module.exports = app;