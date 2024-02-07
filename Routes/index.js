const express = require('express');
const router = express.Router();
const PasinoRoutes = require('./PasinoRoutes')

router.use('/api', PasinoRoutes);
module.exports = router;
