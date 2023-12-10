/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const achieveController = require('../controllers/achievement');
//const validation = require('../middleware/validate');

router.get('/', achieveController.getAll);

router.get('/:id', achieveController.getAchievement);

router.post('/', achieveController.createAchievement);

router.put('/:id', achieveController.updateAchievement);

router.delete('/:id', achieveController.deleteAchievement);

module.exports = router;