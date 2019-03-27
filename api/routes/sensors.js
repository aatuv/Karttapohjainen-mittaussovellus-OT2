const express = require('express');
const router = express.Router();
const anturiController = require('../controllers/anturiController');

router.route('/sensors').get(anturiController.fetchSensors);
router.route('/sensors').post(anturiController.insertSensor);


module.exports = router;
