const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/users', require('./user'));
router.use('/workout', require('./workout'));
router.use('/progress', './progress');
router.use('/muscleGroup', require('./muscleGroup'));

module.exports = router