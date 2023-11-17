/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const workController = require('../controllers/workout');


router.get('/', workController.getAll);

router.get('/:username', workController.getWorkout);

router.put('/:id', workController.updateWorkout);

router.post('/', workController.createWorkout);

router.delete('/:id', workController.deleteWorkout);



module.exports = router;