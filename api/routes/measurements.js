const express = require('express');
const router = express.Router();
const mittausController = require('../controllers/mittausController');

router.route('/measurement').get(mittausController.fetchMeasurement);
router.route('/measurements').get(mittausController.fetchMeasurements);

module.exports = router;