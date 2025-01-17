const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const sensors = require('./api/routes/sensors');
const maps = require('./api/routes/maps');
const locations = require('./api/routes/locations');
const measurements = require('./api/routes/measurements');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/', sensors);
app.use('/', maps);
app.use('/', locations);
app.use('/', measurements);

//404
app.use((req, res) => {
    return res.status(404).send({ message : `404 Requested route ${req.url} was not found`});
})

//500
app.use((req, res) => {
    return res.status(500).send({ message : `Internal server error`});
})
module.exports = app;