/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const achieveController = require('../controllers/achievements');
const validation = require('../middleware/validate');

router.get('/', achieveController.getAll);

router.get('/:id', achieveController.getAchievement);

router.post('/',validation.saveAchievement, achieveController.createAchievement);

router.put('/:id',validation.saveAchievement, achieveController.updateAchievement);

router.delete('/:id', achieveController.deleteAchievement);

module.exports = router;