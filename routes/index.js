/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/users', require('./user'));
router.use('/workout', require('./workout'));
router.use('/progress', require('./progress'))
router.use('/achievement', require('./achievement'))

module.exports = router;