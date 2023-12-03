/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const achieveController = require('../controllers/achievement');
const validation = require('../middleware/validate');

router.get('/', achieveController.getAll);

router.get('/:id', achieveController.getAchievement);

router.post('/',validation.validateAchievement, achieveController.createAchievement);

router.put('/:id',validation.validateAchievement, achieveController.updateAchievement);

router.delete('/:id', achieveController.deleteAchievement);

module.exports = router;