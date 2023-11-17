/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const achieveController = require('../controllers/achievement');


router.get('/', achieveController.getAll);

router.get('/:username', achieveController.getAchievement);

router.put('/:id', achieveController.updateAchievement);

router.post('/', achieveController.createAchievement);

router.delete('/:id', achieveController.deleteAchievement);



module.exports = router;