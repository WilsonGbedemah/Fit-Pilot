/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const progController = require('../controllers/progress');
//const validation = require('../middleware/validate');

router.get('/', progController.getAll);

router.get('/:id', progController.getProgress);

router.post('/', progController.createProgress);

router.put('/:id', progController.updateProgress);

router.delete('/:id', progController.deleteProgress);

module.exports = router;