const express = require('express');
const router = express.Router();
const karttaController = require('../controllers/karttaController');

router.route('/maps').get(karttaController.fetchMaps);
router.route('/maps').post(karttaController.insertMap);

module.exports = router;