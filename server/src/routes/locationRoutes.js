const express = require('express');

const {
  getLocations,
  getBuildings,
  getFacilities,
} = require('../controllers/locationController');

const router = express.Router();

router.get('/', getLocations);
router.get('/buildings', getBuildings);
router.get('/facilities', getFacilities);

module.exports = router;