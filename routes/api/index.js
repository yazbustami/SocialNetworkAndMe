const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
router.use('/thoughts', thoughtRoutes);
router.use('/userRoutes', userRoutes);
module.exports = router;