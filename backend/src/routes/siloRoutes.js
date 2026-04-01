const express = require('express');
const router = express.Router();
const siloController = require('../controllers/siloController');

// GET /api/silo/scan - Retrieves the latest 3D point cloud scan
router.get('/scan', siloController.getSiloScan);

module.exports = router;
