const express = require('express');

const scriptRoute = require('./scriptRoutes');

const router = express.Router();

router.use('/script', scriptRoute);

module.exports = router;
