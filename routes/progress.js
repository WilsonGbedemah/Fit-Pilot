/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const progController = require('../controllers/progress');


router.get('/', progController.getAll);

router.get('/:username', progController.getProgress);

router.put('/:id', progController.updateProgress);

router.post('/', progController.createProgress);

router.delete('/:id', progController.deleteProgress);



module.exports = router;