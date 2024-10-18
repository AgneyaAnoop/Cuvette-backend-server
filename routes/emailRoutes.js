const express = require('express');
const { sendJobAlerts } = require('../controllers/emailController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/job-alerts/:jobId', sendJobAlerts);

module.exports = router;