const express = require('express');
const router = express.Router();
const anturiSijaintiController = require('../controllers/anturiSijaintiController');

router.route('/locations').get(anturiSijaintiController.fetchLocations);
router.route('/locations').post(anturiSijaintiController.insertLocation);
router.route('/findlocation').get(anturiSijaintiController.doesLocationExist);
router.route('/updatelocation').post(anturiSijaintiController.updateLocation);

module.exports = router;