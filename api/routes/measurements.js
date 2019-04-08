const express = require('express');
const router = express.Router();
const mittausController = require('../controllers/mittausController');

router.route('/measurements').get(mittausController.fetchMeasurements);
router.route('/measurements').post(mittausController.insertMeasurement);

module.exports = router;