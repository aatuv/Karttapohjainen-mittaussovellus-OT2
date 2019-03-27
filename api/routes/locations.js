const express = require('express');
const router = express.Router();
const anturiSijaintiController = require('../controllers/anturiSijaintiController');

router.route('/locations').get(anturiSijaintiController.fetchLocations);
router.route('/locations').post(anturiSijaintiController.insertLocation);

module.exports = router;